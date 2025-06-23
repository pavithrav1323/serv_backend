import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
export declare class ReportsController {
    private reportsService;
    constructor(reportsService: ReportsService);
    createReport(req: any, dto: CreateReportDto): Promise<{
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
    getMyReports(req: any, page?: number, limit?: number): Promise<{
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
    getAllReports(req: any, page?: number, limit?: number): Promise<{
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
    getMyReportHistory(req: any, page?: number, limit?: number): Promise<{
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
    getReportById(req: any, id: string): Promise<{
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
    updateReport(req: any, id: string, dto: UpdateReportDto): Promise<{
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
    deleteReport(req: any, id: string): Promise<{
        message: string;
    }>;
}
