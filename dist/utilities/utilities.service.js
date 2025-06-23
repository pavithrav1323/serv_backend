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
exports.UtilitiesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UtilitiesService = class UtilitiesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async geocode(dto) {
        const mockLocation = {
            address: 'Mock Address',
            city: 'Mock City',
            state: 'Mock State',
            country: 'Mock Country',
            postalCode: '12345',
            formattedAddress: `${dto.latitude}, ${dto.longitude}`,
        };
        return {
            coordinates: { lat: dto.latitude, lng: dto.longitude },
            location: mockLocation,
        };
    }
    async getNotifications(userId, page = 1, limit = 10) {
        const mockNotifications = [
            {
                id: '1',
                userId,
                title: 'Welcome to the system',
                message: 'Your account has been successfully created',
                type: 'info',
                isRead: false,
                createdAt: new Date(),
            },
            {
                id: '2',
                userId,
                title: 'Attendance reminder',
                message: 'Don\'t forget to check in for your shift',
                type: 'reminder',
                isRead: true,
                createdAt: new Date(Date.now() - 86400000),
            },
        ];
        return {
            notifications: mockNotifications,
            pagination: {
                page,
                limit,
                total: mockNotifications.length,
                pages: Math.ceil(mockNotifications.length / limit),
            },
        };
    }
};
exports.UtilitiesService = UtilitiesService;
exports.UtilitiesService = UtilitiesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UtilitiesService);
//# sourceMappingURL=utilities.service.js.map