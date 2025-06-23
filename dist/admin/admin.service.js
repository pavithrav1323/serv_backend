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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let AdminService = class AdminService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listUsers(userRole, page = 1, limit = 10) {
        if (userRole === client_1.UserRole.EMPLOYEE)
            throw new common_1.ForbiddenException('Access denied');
        const skip = (page - 1) * limit;
        const [users, total] = await Promise.all([
            this.prisma.user.findMany({ skip, take: limit, orderBy: { createdAt: 'desc' } }),
            this.prisma.user.count(),
        ]);
        return { users, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
    }
    async listAttendance(userRole, page = 1, limit = 10, userId) {
        if (userRole === client_1.UserRole.EMPLOYEE)
            throw new common_1.ForbiddenException('Access denied');
        const skip = (page - 1) * limit;
        const where = userId ? { userId } : {};
        const [attendance, total] = await Promise.all([
            this.prisma.attendance.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' }, include: { user: true } }),
            this.prisma.attendance.count({ where }),
        ]);
        return { attendance, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
    }
    async createShift(userRole, dto) {
        if (userRole === client_1.UserRole.EMPLOYEE)
            throw new common_1.ForbiddenException('Access denied');
        const shift = await this.prisma.shift.create({ data: {
                name: dto.name,
                startTime: dto.startTime ? new Date(dto.startTime) : null,
                endTime: dto.endTime ? new Date(dto.endTime) : null,
                description: dto.description,
            } });
        return { message: 'Shift created', shift };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map