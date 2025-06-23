import { PrismaService } from '../prisma/prisma.service';
import { GeocodeDto } from './dto/geocode.dto';
export declare class UtilitiesService {
    private prisma;
    constructor(prisma: PrismaService);
    geocode(dto: GeocodeDto): Promise<{
        coordinates: {
            lat: number;
            lng: number;
        };
        location: {
            address: string;
            city: string;
            state: string;
            country: string;
            postalCode: string;
            formattedAddress: string;
        };
    }>;
    getNotifications(userId: string, page?: number, limit?: number): Promise<{
        notifications: {
            id: string;
            userId: string;
            title: string;
            message: string;
            type: string;
            isRead: boolean;
            createdAt: Date;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
}
