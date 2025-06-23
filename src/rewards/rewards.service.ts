import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class RewardsService {
  constructor(private prisma: PrismaService) {}

  async createReward(dto: CreateRewardDto, creatorRole: UserRole) {
    if (creatorRole === UserRole.EMPLOYEE) throw new ForbiddenException('Access denied');
    const reward = await this.prisma.reward.create({ data: dto });
    return { message: 'Reward created', reward };
  }

  async getMyRewards(userId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [rewards, total] = await Promise.all([
      this.prisma.reward.findMany({ where: { userId }, skip, take: limit, orderBy: { createdAt: 'desc' } }),
      this.prisma.reward.count({ where: { userId } }),
    ]);
    return { rewards, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
  }

  async getRewardById(id: string, userId: string, userRole: UserRole) {
    const reward = await this.prisma.reward.findUnique({ where: { id } });
    if (!reward) throw new NotFoundException('Reward not found');
    if (userRole === UserRole.EMPLOYEE && reward.userId !== userId) throw new ForbiddenException('Access denied');
    return reward;
  }

  async getAllRewards(userRole: UserRole, page = 1, limit = 10) {
    if (userRole === UserRole.EMPLOYEE) throw new ForbiddenException('Access denied');
    const skip = (page - 1) * limit;
    const [rewards, total] = await Promise.all([
      this.prisma.reward.findMany({ skip, take: limit, orderBy: { createdAt: 'desc' } }),
      this.prisma.reward.count(),
    ]);
    return { rewards, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
  }

  async redeemReward(id: string, userId: string) {
    const reward = await this.prisma.reward.findUnique({ where: { id } });
    if (!reward) throw new NotFoundException('Reward not found');
    if (reward.userId !== userId) throw new ForbiddenException('Access denied');
    if (reward.redeemedAt) throw new ForbiddenException('Reward already redeemed');
    const updated = await this.prisma.reward.update({ where: { id }, data: { redeemedAt: new Date() } });
    return { message: 'Reward redeemed', reward: updated };
  }

  async deleteReward(id: string, userRole: UserRole) {
    if (userRole === UserRole.EMPLOYEE) throw new ForbiddenException('Access denied');
    await this.prisma.reward.delete({ where: { id } });
    return { message: 'Reward deleted' };
  }
} 