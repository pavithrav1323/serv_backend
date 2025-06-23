import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from '@prisma/client';
import { CreateShiftDto } from '../shifts/dto/create-shift.dto';
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    listUsers(userRole: UserRole, page?: number, limit?: number): Promise<{
        users: {
            email: string;
            phone: string | null;
            password: string;
            firstName: string;
            lastName: string;
            id: string;
            role: import(".prisma/client").$Enums.UserRole;
            isActive: boolean;
            avatar: string | null;
            faceTemplate: string | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    listAttendance(userRole: UserRole, page?: number, limit?: number, userId?: string): Promise<{
        attendance: ({
            user: {
                email: string;
                phone: string | null;
                password: string;
                firstName: string;
                lastName: string;
                id: string;
                role: import(".prisma/client").$Enums.UserRole;
                isActive: boolean;
                avatar: string | null;
                faceTemplate: string | null;
                createdAt: Date;
                updatedAt: Date;
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
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    createShift(userRole: UserRole, dto: CreateShiftDto): Promise<{
        message: string;
        shift: {
            name: string;
            description: string | null;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            startTime: Date | null;
            endTime: Date | null;
        };
    }>;
}
