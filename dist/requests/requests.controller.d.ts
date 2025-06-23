import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
export declare class RequestsController {
    private requestsService;
    constructor(requestsService: RequestsService);
    createRequest(req: any, createRequestDto: CreateRequestDto): Promise<{
        message: string;
        request: {
            user: {
                email: string;
                firstName: string;
                lastName: string;
                id: string;
            };
        } & {
            type: import(".prisma/client").$Enums.RequestType;
            description: string | null;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            startDate: Date | null;
            endDate: Date | null;
            status: import(".prisma/client").$Enums.RequestStatus;
            approvedBy: string | null;
            approvedAt: Date | null;
        };
    }>;
    getMyRequests(req: any, page?: number, limit?: number): Promise<{
        requests: ({
            user: {
                email: string;
                firstName: string;
                lastName: string;
                id: string;
            };
        } & {
            type: import(".prisma/client").$Enums.RequestType;
            description: string | null;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            startDate: Date | null;
            endDate: Date | null;
            status: import(".prisma/client").$Enums.RequestStatus;
            approvedBy: string | null;
            approvedAt: Date | null;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    getAllRequests(req: any, page?: number, limit?: number): Promise<{
        requests: ({
            user: {
                email: string;
                firstName: string;
                lastName: string;
                id: string;
            };
        } & {
            type: import(".prisma/client").$Enums.RequestType;
            description: string | null;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            startDate: Date | null;
            endDate: Date | null;
            status: import(".prisma/client").$Enums.RequestStatus;
            approvedBy: string | null;
            approvedAt: Date | null;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    getRequestById(req: any, id: string): Promise<{
        user: {
            email: string;
            firstName: string;
            lastName: string;
            id: string;
        };
    } & {
        type: import(".prisma/client").$Enums.RequestType;
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        startDate: Date | null;
        endDate: Date | null;
        status: import(".prisma/client").$Enums.RequestStatus;
        approvedBy: string | null;
        approvedAt: Date | null;
    }>;
    updateRequest(req: any, id: string, updateRequestDto: UpdateRequestDto): Promise<{
        message: string;
        request: {
            user: {
                email: string;
                firstName: string;
                lastName: string;
                id: string;
            };
        } & {
            type: import(".prisma/client").$Enums.RequestType;
            description: string | null;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            startDate: Date | null;
            endDate: Date | null;
            status: import(".prisma/client").$Enums.RequestStatus;
            approvedBy: string | null;
            approvedAt: Date | null;
        };
    }>;
    deleteRequest(req: any, id: string): Promise<{
        message: string;
    }>;
}
