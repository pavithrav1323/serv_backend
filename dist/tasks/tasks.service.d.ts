import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UserRole } from '@prisma/client';
export declare class TasksService {
    private prisma;
    constructor(prisma: PrismaService);
    createTask(userId: string, createTaskDto: CreateTaskDto): Promise<{
        message: string;
        task: {
            assignedUser: {
                email: string;
                firstName: string;
                lastName: string;
                id: string;
            };
            creator: {
                email: string;
                firstName: string;
                lastName: string;
                id: string;
            };
        } & {
            description: string | null;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.TaskStatus;
            priority: import(".prisma/client").$Enums.TaskPriority;
            assignedTo: string | null;
            dueDate: Date | null;
            createdBy: string;
            completedAt: Date | null;
        };
    }>;
    getMyTasks(userId: string, page?: number, limit?: number): Promise<{
        tasks: ({
            assignedUser: {
                email: string;
                firstName: string;
                lastName: string;
                id: string;
            };
            creator: {
                email: string;
                firstName: string;
                lastName: string;
                id: string;
            };
        } & {
            description: string | null;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.TaskStatus;
            priority: import(".prisma/client").$Enums.TaskPriority;
            assignedTo: string | null;
            dueDate: Date | null;
            createdBy: string;
            completedAt: Date | null;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    getCreatedTasks(userId: string, page?: number, limit?: number): Promise<{
        tasks: ({
            assignedUser: {
                email: string;
                firstName: string;
                lastName: string;
                id: string;
            };
            creator: {
                email: string;
                firstName: string;
                lastName: string;
                id: string;
            };
        } & {
            description: string | null;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.TaskStatus;
            priority: import(".prisma/client").$Enums.TaskPriority;
            assignedTo: string | null;
            dueDate: Date | null;
            createdBy: string;
            completedAt: Date | null;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    getTaskById(taskId: string, userId: string, userRole: UserRole): Promise<{
        assignedUser: {
            email: string;
            firstName: string;
            lastName: string;
            id: string;
        };
        creator: {
            email: string;
            firstName: string;
            lastName: string;
            id: string;
        };
    } & {
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.TaskStatus;
        priority: import(".prisma/client").$Enums.TaskPriority;
        assignedTo: string | null;
        dueDate: Date | null;
        createdBy: string;
        completedAt: Date | null;
    }>;
    updateTask(taskId: string, updateTaskDto: UpdateTaskDto, userId: string, userRole: UserRole): Promise<{
        message: string;
        task: {
            assignedUser: {
                email: string;
                firstName: string;
                lastName: string;
                id: string;
            };
            creator: {
                email: string;
                firstName: string;
                lastName: string;
                id: string;
            };
        } & {
            description: string | null;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.TaskStatus;
            priority: import(".prisma/client").$Enums.TaskPriority;
            assignedTo: string | null;
            dueDate: Date | null;
            createdBy: string;
            completedAt: Date | null;
        };
    }>;
    deleteTask(taskId: string, userId: string, userRole: UserRole): Promise<{
        message: string;
    }>;
    submitTask(taskId: string, userId: string): Promise<{
        message: string;
        task: {
            assignedUser: {
                email: string;
                firstName: string;
                lastName: string;
                id: string;
            };
            creator: {
                email: string;
                firstName: string;
                lastName: string;
                id: string;
            };
        } & {
            description: string | null;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.TaskStatus;
            priority: import(".prisma/client").$Enums.TaskPriority;
            assignedTo: string | null;
            dueDate: Date | null;
            createdBy: string;
            completedAt: Date | null;
        };
    }>;
    getMyServHistory(userId: string, page?: number, limit?: number): Promise<{
        tasks: ({
            assignedUser: {
                email: string;
                firstName: string;
                lastName: string;
                id: string;
            };
            creator: {
                email: string;
                firstName: string;
                lastName: string;
                id: string;
            };
        } & {
            description: string | null;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.TaskStatus;
            priority: import(".prisma/client").$Enums.TaskPriority;
            assignedTo: string | null;
            dueDate: Date | null;
            createdBy: string;
            completedAt: Date | null;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    getAllTasks(userRole: UserRole, page?: number, limit?: number): Promise<{
        tasks: ({
            assignedUser: {
                email: string;
                firstName: string;
                lastName: string;
                id: string;
            };
            creator: {
                email: string;
                firstName: string;
                lastName: string;
                id: string;
            };
        } & {
            description: string | null;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.TaskStatus;
            priority: import(".prisma/client").$Enums.TaskPriority;
            assignedTo: string | null;
            dueDate: Date | null;
            createdBy: string;
            completedAt: Date | null;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
}
