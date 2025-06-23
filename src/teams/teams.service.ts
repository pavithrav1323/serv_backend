import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { AddMemberDto } from './dto/add-member.dto';
import { TeamRole, UserRole } from '@prisma/client';

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}

  async createTeam(userId: string, dto: CreateTeamDto) {
    const team = await this.prisma.team.create({
      data: {
        name: dto.name,
        description: dto.description,
        createdBy: userId,
        members: {
          create: {
            userId,
            role: TeamRole.LEADER,
          },
        },
      },
      include: {
        members: true,
      },
    });
    return { message: 'Team created', team };
  }

  async updateTeam(teamId: string, dto: UpdateTeamDto, userId: string, userRole: UserRole) {
    const team = await this.prisma.team.findUnique({ where: { id: teamId } });
    if (!team) throw new NotFoundException('Team not found');
    if (userRole === UserRole.EMPLOYEE && team.createdBy !== userId) throw new ForbiddenException('Access denied');
    const updated = await this.prisma.team.update({ where: { id: teamId }, data: dto });
    return { message: 'Team updated', team: updated };
  }

  async addMember(teamId: string, dto: AddMemberDto, userId: string, userRole: UserRole) {
    const team = await this.prisma.team.findUnique({ where: { id: teamId } });
    if (!team) throw new NotFoundException('Team not found');
    if (userRole === UserRole.EMPLOYEE && team.createdBy !== userId) throw new ForbiddenException('Access denied');
    const exists = await this.prisma.teamMember.findUnique({ where: { teamId_userId: { teamId, userId: dto.userId } } });
    if (exists) throw new ConflictException('User already in team');
    const member = await this.prisma.teamMember.create({ data: { teamId, userId: dto.userId, role: dto.role } });
    return { message: 'Member added', member };
  }

  async removeMember(teamId: string, memberId: string, userId: string, userRole: UserRole) {
    const team = await this.prisma.team.findUnique({ where: { id: teamId } });
    if (!team) throw new NotFoundException('Team not found');
    if (userRole === UserRole.EMPLOYEE && team.createdBy !== userId) throw new ForbiddenException('Access denied');
    await this.prisma.teamMember.delete({ where: { teamId_userId: { teamId, userId: memberId } } });
    return { message: 'Member removed' };
  }

  async getTeam(teamId: string) {
    const team = await this.prisma.team.findUnique({
      where: { id: teamId },
      include: {
        members: { include: { user: { select: { id: true, firstName: true, lastName: true, email: true } } } },
        creator: { select: { id: true, firstName: true, lastName: true, email: true } },
      },
    });
    if (!team) throw new NotFoundException('Team not found');
    return team;
  }

  async getMyTeams(userId: string) {
    const teams = await this.prisma.teamMember.findMany({
      where: { userId },
      include: {
        team: {
          include: {
            members: { include: { user: { select: { id: true, firstName: true, lastName: true, email: true } } } },
            creator: { select: { id: true, firstName: true, lastName: true, email: true } },
          },
        },
      },
    });
    return teams.map(tm => tm.team);
  }

  async getAllTeams(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [teams, total] = await Promise.all([
      this.prisma.team.findMany({
        skip,
        take: limit,
        include: {
          members: { include: { user: { select: { id: true, firstName: true, lastName: true, email: true } } } },
          creator: { select: { id: true, firstName: true, lastName: true, email: true } },
        },
      }),
      this.prisma.team.count(),
    ]);
    return { teams, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
  }
} 