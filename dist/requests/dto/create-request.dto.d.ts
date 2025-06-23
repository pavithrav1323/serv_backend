import { RequestType } from '@prisma/client';
export declare class CreateRequestDto {
    type: RequestType;
    title: string;
    description?: string;
    startDate?: string;
    endDate?: string;
}
