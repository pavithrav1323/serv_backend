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
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let ReportsService = class ReportsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createReport(userId, dto) {
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
    async getMyReports(userId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [reports, total] = await Promise.all([
            this.prisma.report.findMany({ where: { userId }, skip, take: limit, orderBy: { createdAt: 'desc' } }),
            this.prisma.report.count({ where: { userId } }),
        ]);
        return { reports, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
    }
    async getReportById(id, userId, userRole) {
        const report = await this.prisma.report.findUnique({ where: { id } });
        if (!report)
            throw new common_1.NotFoundException('Report not found');
        if (userRole === client_1.UserRole.EMPLOYEE && report.userId !== userId)
            throw new common_1.ForbiddenException('Access denied');
        return report;
    }
    async updateReport(id, dto, userId, userRole) {
        const report = await this.prisma.report.findUnique({ where: { id } });
        if (!report)
            throw new common_1.NotFoundException('Report not found');
        if (userRole === client_1.UserRole.EMPLOYEE && report.userId !== userId)
            throw new common_1.ForbiddenException('Access denied');
        const updated = await this.prisma.report.update({ where: { id }, data: dto });
        return { message: 'Report updated', report: updated };
    }
    async deleteReport(id, userId, userRole) {
        const report = await this.prisma.report.findUnique({ where: { id } });
        if (!report)
            throw new common_1.NotFoundException('Report not found');
        if (userRole === client_1.UserRole.EMPLOYEE && report.userId !== userId)
            throw new common_1.ForbiddenException('Access denied');
        await this.prisma.report.delete({ where: { id } });
        return { message: 'Report deleted' };
    }
    async getAllReports(userRole, page = 1, limit = 10) {
        if (userRole === client_1.UserRole.EMPLOYEE)
            throw new common_1.ForbiddenException('Access denied');
        const skip = (page - 1) * limit;
        const [reports, total] = await Promise.all([
            this.prisma.report.findMany({ skip, take: limit, orderBy: { createdAt: 'desc' } }),
            this.prisma.report.count(),
        ]);
        return { reports, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
    }
    async getMyReportHistory(userId, page = 1, limit = 10) {
        return this.getMyReports(userId, page, limit);
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReportsService);
//# sourceMappingURL=reports.service.js.map