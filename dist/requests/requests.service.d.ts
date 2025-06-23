import { PrismaService } from '../prisma/prisma.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { UserRole } from '@prisma/client';
export declare class RequestsService {
    private prisma;
    constructor(prisma: PrismaService);
    createRequest(userId: string, createRequestDto: CreateRequestDto): Promise<{
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
    getMyRequests(userId: string, page?: number, limit?: number): Promise<{
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
    getRequestById(requestId: string, userId: string, userRole: UserRole): Promise<{
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
    updateRequest(requestId: string, updateRequestDto: UpdateRequestDto, userId: string, userRole: UserRole): Promise<{
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
    deleteRequest(requestId: string, userId: string, userRole: UserRole): Promise<{
        message: string;
    }>;
    getAllRequests(userRole: UserRole, page?: number, limit?: number): Promise<{
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
}
