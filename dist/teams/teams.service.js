"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let TeamsService = class TeamsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createTeam(userId, dto) {
        const team = await this.prisma.team.create({
            data: {
                name: dto.name,
                description: dto.description,
                createdBy: userId,
                members: {
                    create: {
                        userId,
                        role: client_1.TeamRole.LEADER,
                    },
                },
            },
            include: {
                members: true,
            },
        });
        return { message: 'Team created', team };
    }
    async updateTeam(teamId, dto, userId, userRole) {
        const team = await this.prisma.team.findUnique({ where: { id: teamId } });
        if (!team)
            throw new common_1.NotFoundException('Team not found');
        if (userRole === client_1.UserRole.EMPLOYEE && team.createdBy !== userId)
            throw new common_1.ForbiddenException('Access denied');
        const updated = await this.prisma.team.update({ where: { id: teamId }, data: dto });
        return { message: 'Team updated', team: updated };
    }
    async addMember(teamId, dto, userId, userRole) {
        const team = await this.prisma.team.findUnique({ where: { id: teamId } });
        if (!team)
            throw new common_1.NotFoundException('Team not found');
        if (userRole === client_1.UserRole.EMPLOYEE && team.createdBy !== userId)
            throw new common_1.ForbiddenException('Access denied');
        const exists = await this.prisma.teamMember.findUnique({ where: { teamId_userId: { teamId, userId: dto.userId } } });
        if (exists)
            throw new common_1.ConflictException('User already in team');
        const member = await this.prisma.teamMember.create({ data: { teamId, userId: dto.userId, role: dto.role } });
        return { message: 'Member added', member };
    }
    async removeMember(teamId, memberId, userId, userRole) {
        const team = await this.prisma.team.findUnique({ where: { id: teamId } });
        if (!team)
            throw new common_1.NotFoundException('Team not found');
        if (userRole === client_1.UserRole.EMPLOYEE && team.createdBy !== userId)
            throw new common_1.ForbiddenException('Access denied');
        await this.prisma.teamMember.delete({ where: { teamId_userId: { teamId, userId: memberId } } });
        return { message: 'Member removed' };
    }
    async getTeam(teamId) {
        const team = await this.prisma.team.findUnique({
            where: { id: teamId },
            include: {
                members: { include: { user: { select: { id: true, firstName: true, lastName: true, email: true } } } },
                creator: { select: { id: true, firstName: true, lastName: true, email: true } },
            },
        });
        if (!team)
            throw new common_1.NotFoundException('Team not found');
        return team;
    }
    async getMyTeams(userId) {
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
};
exports.TeamsService = TeamsService;
exports.TeamsService = TeamsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TeamsService);
//# sourceMappingURL=teams.service.js.map