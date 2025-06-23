import { RequestStatus } from '@prisma/client';
export declare class UpdateRequestDto {
    status?: RequestStatus;
    title?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
}
