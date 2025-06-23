import { UtilitiesService } from './utilities.service';
import { GeocodeDto } from './dto/geocode.dto';
export declare class UtilitiesController {
    private utilitiesService;
    constructor(utilitiesService: UtilitiesService);
    geocode(query: GeocodeDto): Promise<{
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
    getNotifications(req: any, page?: number, limit?: number): Promise<{
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
