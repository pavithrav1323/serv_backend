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
exports.RequestsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let RequestsService = class RequestsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createRequest(userId, createRequestDto) {
        const request = await this.prisma.request.create({
            data: {
                userId,
                type: createRequestDto.type,
                title: createRequestDto.title,
                description: createRequestDto.description,
                startDate: createRequestDto.startDate ? new Date(createRequestDto.startDate) : null,
                endDate: createRequestDto.endDate ? new Date(createRequestDto.endDate) : null,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
            },
        });
        return {
            message: 'Request created successfully',
            request,
        };
    }
    async getMyRequests(userId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [requests, total] = await Promise.all([
            this.prisma.request.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
                include: {
                    user: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                        },
                    },
                },
            }),
            this.prisma.request.count({ where: { userId } }),
        ]);
        return {
            requests,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    }
    async getRequestById(requestId, userId, userRole) {
        const request = await this.prisma.request.findUnique({
            where: { id: requestId },
            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
            },
        });
        if (!request) {
            throw new common_1.NotFoundException('Request not found');
        }
        if (userRole === client_1.UserRole.EMPLOYEE && request.userId !== userId) {
            throw new common_1.ForbiddenException('Access denied');
        }
        return request;
    }
    async updateRequest(requestId, updateRequestDto, userId, userRole) {
        const request = await this.prisma.request.findUnique({
            where: { id: requestId },
        });
        if (!request) {
            throw new common_1.NotFoundException('Request not found');
        }
        if (userRole === client_1.UserRole.EMPLOYEE) {
            if (request.userId !== userId) {
                throw new common_1.ForbiddenException('Access denied');
            }
            if (request.status !== client_1.RequestStatus.PENDING) {
                throw new common_1.ForbiddenException('Cannot update non-pending request');
            }
        }
        const updatedRequest = await this.prisma.request.update({
            where: { id: requestId },
            data: {
                ...updateRequestDto,
                startDate: updateRequestDto.startDate ? new Date(updateRequestDto.startDate) : undefined,
                endDate: updateRequestDto.endDate ? new Date(updateRequestDto.endDate) : undefined,
                ...(updateRequestDto.status && (updateRequestDto.status === client_1.RequestStatus.APPROVED || updateRequestDto.status === client_1.RequestStatus.REJECTED) && {
                    approvedBy: userId,
                    approvedAt: new Date(),
                }),
            },
            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
            },
        });
        return {
            message: 'Request updated successfully',
            request: updatedRequest,
        };
    }
    async deleteRequest(requestId, userId, userRole) {
        const request = await this.prisma.request.findUnique({
            where: { id: requestId },
        });
        if (!request) {
            throw new common_1.NotFoundException('Request not found');
        }
        if (userRole === client_1.UserRole.EMPLOYEE) {
            if (request.userId !== userId) {
                throw new common_1.ForbiddenException('Access denied');
            }
            if (request.status !== client_1.RequestStatus.PENDING) {
                throw new common_1.ForbiddenException('Cannot delete non-pending request');
            }
        }
        await this.prisma.request.delete({
            where: { id: requestId },
        });
        return { message: 'Request deleted successfully' };
    }
    async getAllRequests(userRole, page = 1, limit = 10) {
        if (userRole === client_1.UserRole.EMPLOYEE) {
            throw new common_1.ForbiddenException('Access denied');
        }
        const skip = (page - 1) * limit;
        const [requests, total] = await Promise.all([
            this.prisma.request.findMany({
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
                include: {
                    user: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                        },
                    },
                },
            }),
            this.prisma.request.count(),
        ]);
        return {
            requests,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    }
};
exports.RequestsService = RequestsService;
exports.RequestsService = RequestsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RequestsService);
//# sourceMappingURL=requests.service.js.map