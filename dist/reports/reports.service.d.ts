import { PrismaService } from '../prisma/prisma.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { UserRole } from '@prisma/client';
export declare class ReportsService {
    private prisma;
    constructor(prisma: PrismaService);
    createReport(userId: string, dto: CreateReportDto): Promise<{
        message: string;
        report: {
            type: import(".prisma/client").$Enums.ReportType;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            userId: string;
            status: import(".prisma/client").$Enums.ReportStatus;
            submittedAt: Date | null;
        };
    }>;
    getMyReports(userId: string, page?: number, limit?: number): Promise<{
        reports: {
            type: import(".prisma/client").$Enums.ReportType;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            userId: string;
            status: import(".prisma/client").$Enums.ReportStatus;
            submittedAt: Date | null;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    getReportById(id: string, userId: string, userRole: UserRole): Promise<{
        type: import(".prisma/client").$Enums.ReportType;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        userId: string;
        status: import(".prisma/client").$Enums.ReportStatus;
        submittedAt: Date | null;
    }>;
    updateReport(id: string, dto: UpdateReportDto, userId: string, userRole: UserRole): Promise<{
        message: string;
        report: {
            type: import(".prisma/client").$Enums.ReportType;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            userId: string;
            status: import(".prisma/client").$Enums.ReportStatus;
            submittedAt: Date | null;
        };
    }>;
    deleteReport(id: string, userId: string, userRole: UserRole): Promise<{
        message: string;
    }>;
    getAllReports(userRole: UserRole, page?: number, limit?: number): Promise<{
        reports: {
            type: import(".prisma/client").$Enums.ReportType;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            userId: string;
            status: import(".prisma/client").$Enums.ReportStatus;
            submittedAt: Date | null;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    getMyReportHistory(userId: string, page?: number, limit?: number): Promise<{
        reports: {
            type: import(".prisma/client").$Enums.ReportType;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            userId: string;
            status: import(".prisma/client").$Enums.ReportStatus;
            submittedAt: Date | null;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
}
