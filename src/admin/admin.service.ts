import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from '@prisma/client';
import { CreateShiftDto } from '../shifts/dto/create-shift.dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async listUsers(userRole: UserRole, page = 1, limit = 10) {
    if (userRole === UserRole.EMPLOYEE) throw new ForbiddenException('Access denied');
    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
      this.prisma.user.findMany({ skip, take: limit, orderBy: { createdAt: 'desc' } }),
      this.prisma.user.count(),
    ]);
    return { users, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
  }

  async listAttendance(userRole: UserRole, page = 1, limit = 10, userId?: string) {
    if (userRole === UserRole.EMPLOYEE) throw new ForbiddenException('Access denied');
    const skip = (page - 1) * limit;
    const where = userId ? { userId } : {};
    const [attendance, total] = await Promise.all([
      this.prisma.attendance.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' }, include: { user: true } }),
      this.prisma.attendance.count({ where }),
    ]);
    return { attendance, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
  }

  async createShift(userRole: UserRole, dto: CreateShiftDto) {
    if (userRole === UserRole.EMPLOYEE) throw new ForbiddenException('Access denied');
    const shift = await this.prisma.shift.create({ data: {
      name: dto.name,
      startTime: dto.startTime ? new Date(dto.startTime) : null,
      endTime: dto.endTime ? new Date(dto.endTime) : null,
      description: dto.description,
    }});
    return { message: 'Shift created', shift };
  }
} 