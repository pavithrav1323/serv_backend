import { ReportType } from '@prisma/client';
export declare class CreateReportDto {
    type: ReportType;
    title: string;
    content: string;
}
