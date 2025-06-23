import { PrismaService } from '../prisma/prisma.service';
import { EmergencyAlertDto } from './dto/emergency-alert.dto';
export declare class EmergencyService {
    private prisma;
    constructor(prisma: PrismaService);
    sendEmergencyAlert(userId: string, dto: EmergencyAlertDto): Promise<{
        message: string;
        alert: {
            userId: string;
            message: string;
            location: string;
            latitude: number;
            longitude: number;
            timestamp: Date;
        };
        timestamp: Date;
    }>;
}
