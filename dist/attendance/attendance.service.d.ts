import { PrismaService } from '../prisma/prisma.service';
import { CheckInDto } from './dto/check-in.dto';
import { CheckOutDto } from './dto/check-out.dto';
export declare class AttendanceService {
    private prisma;
    constructor(prisma: PrismaService);
    checkIn(userId: string, checkInDto: CheckInDto): Promise<{
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
    checkOut(userId: string, checkOutDto: CheckOutDto): Promise<{
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
    getTimer(userId: string): Promise<{
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
    getHistory(userId: string, page?: number, limit?: number): Promise<{
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
    private calculateDuration;
}
