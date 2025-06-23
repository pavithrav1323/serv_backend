import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class ShiftsService {
  constructor(private prisma: PrismaService) {}

  async createShift(dto: CreateShiftDto, userRole: UserRole) {
    if (userRole === UserRole.EMPLOYEE) throw new ForbiddenException('Access denied');
    const shift = await this.prisma.shift.create({ data: {
      name: dto.name,
      startTime: dto.startTime ? new Date(dto.startTime) : null,
      endTime: dto.endTime ? new Date(dto.endTime) : null,
      description: dto.description,
    }});
    return { message: 'Shift created', shift };
  }

  async updateShift(id: string, dto: UpdateShiftDto, userRole: UserRole) {
    if (userRole === UserRole.EMPLOYEE) throw new ForbiddenException('Access denied');
    const shift = await this.prisma.shift.findUnique({ where: { id } });
    if (!shift) throw new NotFoundException('Shift not found');
    const updated = await this.prisma.shift.update({ where: { id }, data: {
      ...dto,
      startTime: dto.startTime ? new Date(dto.startTime) : undefined,
      endTime: dto.endTime ? new Date(dto.endTime) : undefined,
    }});
    return { message: 'Shift updated', shift: updated };
  }

  async getShifts(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [shifts, total] = await Promise.all([
      this.prisma.shift.findMany({ skip, take: limit, orderBy: { createdAt: 'desc' } }),
      this.prisma.shift.count(),
    ]);
    return { shifts, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
  }

  async getShiftById(id: string) {
    const shift = await this.prisma.shift.findUnique({ where: { id } });
    if (!shift) throw new NotFoundException('Shift not found');
    return shift;
  }
} 