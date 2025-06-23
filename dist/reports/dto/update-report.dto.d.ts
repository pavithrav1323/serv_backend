import { ReportStatus, ReportType } from '@prisma/client';
export declare class UpdateReportDto {
    type?: ReportType;
    title?: string;
    content?: string;
    status?: ReportStatus;
}
