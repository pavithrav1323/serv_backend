import { AttendanceService } from './attendance.service';
import { CheckInDto } from './dto/check-in.dto';
import { CheckOutDto } from './dto/check-out.dto';
export declare class AttendanceController {
    private attendanceService;
    constructor(attendanceService: AttendanceService);
    checkIn(req: any, checkInDto: CheckInDto): Promise<{
        message: string;
        attendance: {
            user: {
                email: string;
                firstName: string;
                lastName: string;
                id: string;
            };
        } & {
            shift: string | null;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            location: string | null;
            latitude: number | null;
            longitude: number | null;
            userId: string;
            checkIn: Date;
            checkOut: Date | null;
        };
    }>;
    checkOut(req: any, checkOutDto: CheckOutDto): Promise<{
        message: string;
        attendance: {
            user: {
                email: string;
                firstName: string;
                lastName: string;
                id: string;
            };
        } & {
            shift: string | null;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            location: string | null;
            latitude: number | null;
            longitude: number | null;
            userId: string;
            checkIn: Date;
            checkOut: Date | null;
        };
        duration: string;
    }>;
    getTimer(req: any): Promise<{
        message: string;
        activeAttendance?: undefined;
        currentTime?: undefined;
        duration?: undefined;
    } | {
        activeAttendance: {
            user: {
                email: string;
                firstName: string;
                lastName: string;
                id: string;
            };
        } & {
            shift: string | null;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            location: string | null;
            latitude: number | null;
            longitude: number | null;
            userId: string;
            checkIn: Date;
            checkOut: Date | null;
        };
        currentTime: Date;
        duration: string;
        message?: undefined;
    }>;
    getHistory(req: any, page?: number, limit?: number): Promise<{
        attendances: {
            duration: string;
            user: {
                email: string;
                firstName: string;
                lastName: string;
                id: string;
            };
            shift: string | null;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            location: string | null;
            latitude: number | null;
            longitude: number | null;
            userId: string;
            checkIn: Date;
            checkOut: Date | null;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    getQuote(): Promise<{
        quote: string;
        author: string;
    }>;
}
