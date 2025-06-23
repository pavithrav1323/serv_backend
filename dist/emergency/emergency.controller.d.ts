import { EmergencyService } from './emergency.service';
import { EmergencyAlertDto } from './dto/emergency-alert.dto';
export declare class EmergencyController {
    private emergencyService;
    constructor(emergencyService: EmergencyService);
    sendEmergencyAlert(req: any, dto: EmergencyAlertDto): Promise<{
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
