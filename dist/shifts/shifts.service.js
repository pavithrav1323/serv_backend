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
exports.ShiftsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let ShiftsService = class ShiftsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createShift(dto, userRole) {
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
    async updateShift(id, dto, userRole) {
        if (userRole === client_1.UserRole.EMPLOYEE)
            throw new common_1.ForbiddenException('Access denied');
        const shift = await this.prisma.shift.findUnique({ where: { id } });
        if (!shift)
            throw new common_1.NotFoundException('Shift not found');
        const updated = await this.prisma.shift.update({ where: { id }, data: {
                ...dto,
                startTime: dto.startTime ? new Date(dto.startTime) : undefined,
                endTime: dto.endTime ? new Date(dto.endTime) : undefined,
            } });
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
    async getShiftById(id) {
        const shift = await this.prisma.shift.findUnique({ where: { id } });
        if (!shift)
            throw new common_1.NotFoundException('Shift not found');
        return shift;
    }
};
exports.ShiftsService = ShiftsService;
exports.ShiftsService = ShiftsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ShiftsService);
//# sourceMappingURL=shifts.service.js.map