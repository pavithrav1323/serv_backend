import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksController {
    private tasksService;
    constructor(tasksService: TasksService);
    createTask(req: any, createTaskDto: CreateTaskDto): Promise<{
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
    getMyTasks(req: any, page?: number, limit?: number): Promise<{
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
    getCreatedTasks(req: any, page?: number, limit?: number): Promise<{
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
    getAllTasks(req: any, page?: number, limit?: number): Promise<{
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
    getTaskById(req: any, id: string): Promise<{
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
    updateTask(req: any, id: string, updateTaskDto: UpdateTaskDto): Promise<{
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
    deleteTask(req: any, id: string): Promise<{
        message: string;
    }>;
    submitTask(req: any, id: string): Promise<{
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
    getMyServHistory(req: any, page?: number, limit?: number): Promise<{
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
