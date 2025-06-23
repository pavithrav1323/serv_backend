import { RewardsService } from './rewards.service';
import { CreateRewardDto } from './dto/create-reward.dto';
export declare class RewardsController {
    private rewardsService;
    constructor(rewardsService: RewardsService);
    createReward(req: any, dto: CreateRewardDto): Promise<{
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
    getMyRewards(req: any, page?: number, limit?: number): Promise<{
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
    getAllRewards(req: any, page?: number, limit?: number): Promise<{
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
    getRewardById(req: any, id: string): Promise<{
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
    redeemReward(req: any, id: string): Promise<{
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
    deleteReward(req: any, id: string): Promise<{
        message: string;
    }>;
}
