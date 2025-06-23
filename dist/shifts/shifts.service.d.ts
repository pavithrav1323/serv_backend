import { PrismaService } from '../prisma/prisma.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { UserRole } from '@prisma/client';
export declare class ShiftsService {
    private prisma;
    constructor(prisma: PrismaService);
    createShift(dto: CreateShiftDto, userRole: UserRole): Promise<{
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
    updateShift(id: string, dto: UpdateShiftDto, userRole: UserRole): Promise<{
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
    getShifts(page?: number, limit?: number): Promise<{
        shifts: {
            name: string;
            description: string | null;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            startTime: Date | null;
            endTime: Date | null;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    getShiftById(id: string): Promise<{
        name: string;
        description: string | null;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        startTime: Date | null;
        endTime: Date | null;
    }>;
}
