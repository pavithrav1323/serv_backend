import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async createReport(userId: string, dto: CreateReportDto) {
    const report = await this.prisma.report.create({
      data: {
        userId,
        type: dto.type,
        title: dto.title,
        content: dto.content,
      },
    });
    return { message: 'Report created', report };
  }

  async getMyReports(userId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [reports, total] = await Promise.all([
      this.prisma.report.findMany({ where: { userId }, skip, take: limit, orderBy: { createdAt: 'desc' } }),
      this.prisma.report.count({ where: { userId } }),
    ]);
    return { reports, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
  }

  async getReportById(id: string, userId: string, userRole: UserRole) {
    const report = await this.prisma.report.findUnique({ where: { id } });
    if (!report) throw new NotFoundException('Report not found');
    if (userRole === UserRole.EMPLOYEE && report.userId !== userId) throw new ForbiddenException('Access denied');
    return report;
  }

  async updateReport(id: string, dto: UpdateReportDto, userId: string, userRole: UserRole) {
    const report = await this.prisma.report.findUnique({ where: { id } });
    if (!report) throw new NotFoundException('Report not found');
    if (userRole === UserRole.EMPLOYEE && report.userId !== userId) throw new ForbiddenException('Access denied');
    const updated = await this.prisma.report.update({ where: { id }, data: dto });
    return { message: 'Report updated', report: updated };
  }

  async deleteReport(id: string, userId: string, userRole: UserRole) {
    const report = await this.prisma.report.findUnique({ where: { id } });
    if (!report) throw new NotFoundException('Report not found');
    if (userRole === UserRole.EMPLOYEE && report.userId !== userId) throw new ForbiddenException('Access denied');
    await this.prisma.report.delete({ where: { id } });
    return { message: 'Report deleted' };
  }

  async getAllReports(userRole: UserRole, page = 1, limit = 10) {
    if (userRole === UserRole.EMPLOYEE) throw new ForbiddenException('Access denied');
    const skip = (page - 1) * limit;
    const [reports, total] = await Promise.all([
      this.prisma.report.findMany({ skip, take: limit, orderBy: { createdAt: 'desc' } }),
      this.prisma.report.count(),
    ]);
    return { reports, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
  }

  async getMyReportHistory(userId: string, page = 1, limit = 10) {
    return this.getMyReports(userId, page, limit);
  }
} 