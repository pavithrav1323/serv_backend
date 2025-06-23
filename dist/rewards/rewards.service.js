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
exports.RewardsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let RewardsService = class RewardsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createReward(dto, creatorRole) {
        if (creatorRole === client_1.UserRole.EMPLOYEE)
            throw new common_1.ForbiddenException('Access denied');
        const reward = await this.prisma.reward.create({ data: dto });
        return { message: 'Reward created', reward };
    }
    async getMyRewards(userId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [rewards, total] = await Promise.all([
            this.prisma.reward.findMany({ where: { userId }, skip, take: limit, orderBy: { createdAt: 'desc' } }),
            this.prisma.reward.count({ where: { userId } }),
        ]);
        return { rewards, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
    }
    async getRewardById(id, userId, userRole) {
        const reward = await this.prisma.reward.findUnique({ where: { id } });
        if (!reward)
            throw new common_1.NotFoundException('Reward not found');
        if (userRole === client_1.UserRole.EMPLOYEE && reward.userId !== userId)
            throw new common_1.ForbiddenException('Access denied');
        return reward;
    }
    async getAllRewards(userRole, page = 1, limit = 10) {
        if (userRole === client_1.UserRole.EMPLOYEE)
            throw new common_1.ForbiddenException('Access denied');
        const skip = (page - 1) * limit;
        const [rewards, total] = await Promise.all([
            this.prisma.reward.findMany({ skip, take: limit, orderBy: { createdAt: 'desc' } }),
            this.prisma.reward.count(),
        ]);
        return { rewards, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
    }
    async redeemReward(id, userId) {
        const reward = await this.prisma.reward.findUnique({ where: { id } });
        if (!reward)
            throw new common_1.NotFoundException('Reward not found');
        if (reward.userId !== userId)
            throw new common_1.ForbiddenException('Access denied');
        if (reward.redeemedAt)
            throw new common_1.ForbiddenException('Reward already redeemed');
        const updated = await this.prisma.reward.update({ where: { id }, data: { redeemedAt: new Date() } });
        return { message: 'Reward redeemed', reward: updated };
    }
    async deleteReward(id, userRole) {
        if (userRole === client_1.UserRole.EMPLOYEE)
            throw new common_1.ForbiddenException('Access denied');
        await this.prisma.reward.delete({ where: { id } });
        return { message: 'Reward deleted' };
    }
};
exports.RewardsService = RewardsService;
exports.RewardsService = RewardsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RewardsService);
//# sourceMappingURL=rewards.service.js.map