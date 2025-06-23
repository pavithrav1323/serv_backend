import { PrismaService } from '../prisma/prisma.service';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UserRole } from '@prisma/client';
export declare class RewardsService {
    private prisma;
    constructor(prisma: PrismaService);
    createReward(dto: CreateRewardDto, creatorRole: UserRole): Promise<{
        message: string;
        reward: {
            type: string;
            description: string | null;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            points: number | null;
            redeemedAt: Date | null;
        };
    }>;
    getMyRewards(userId: string, page?: number, limit?: number): Promise<{
        rewards: {
            type: string;
            description: string | null;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            points: number | null;
            redeemedAt: Date | null;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    getRewardById(id: string, userId: string, userRole: UserRole): Promise<{
        type: string;
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        points: number | null;
        redeemedAt: Date | null;
    }>;
    getAllRewards(userRole: UserRole, page?: number, limit?: number): Promise<{
        rewards: {
            type: string;
            description: string | null;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            points: number | null;
            redeemedAt: Date | null;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    redeemReward(id: string, userId: string): Promise<{
        message: string;
        reward: {
            type: string;
            description: string | null;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            points: number | null;
            redeemedAt: Date | null;
        };
    }>;
    deleteReward(id: string, userRole: UserRole): Promise<{
        message: string;
    }>;
}
