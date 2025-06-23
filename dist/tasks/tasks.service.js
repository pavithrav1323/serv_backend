"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let TasksService = class TasksService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createTask(userId, createTaskDto) {
        const task = await this.prisma.task.create({
            data: {
                title: createTaskDto.title,
                description: createTaskDto.description,
                priority: createTaskDto.priority,
                assignedTo: createTaskDto.assignedTo,
                createdBy: userId,
                dueDate: createTaskDto.dueDate ? new Date(createTaskDto.dueDate) : null,
            },
            include: {
                assignedUser: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                creator: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
            },
        });
        return {
            message: 'Task created successfully',
            task,
        };
    }
    async getMyTasks(userId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [tasks, total] = await Promise.all([
            this.prisma.task.findMany({
                where: { assignedTo: userId },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
                include: {
                    assignedUser: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                        },
                    },
                    creator: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                        },
                    },
                },
            }),
            this.prisma.task.count({ where: { assignedTo: userId } }),
        ]);
        return {
            tasks,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    }
    async getCreatedTasks(userId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [tasks, total] = await Promise.all([
            this.prisma.task.findMany({
                where: { createdBy: userId },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
                include: {
                    assignedUser: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                        },
                    },
                    creator: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                        },
                    },
                },
            }),
            this.prisma.task.count({ where: { createdBy: userId } }),
        ]);
        return {
            tasks,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    }
    async getTaskById(taskId, userId, userRole) {
        const task = await this.prisma.task.findUnique({
            where: { id: taskId },
            include: {
                assignedUser: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                creator: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
            },
        });
        if (!task) {
            throw new common_1.NotFoundException('Task not found');
        }
        if (userRole === client_1.UserRole.EMPLOYEE && task.createdBy !== userId && task.assignedTo !== userId) {
            throw new common_1.ForbiddenException('Access denied');
        }
        return task;
    }
    async updateTask(taskId, updateTaskDto, userId, userRole) {
        const task = await this.prisma.task.findUnique({
            where: { id: taskId },
        });
        if (!task) {
            throw new common_1.NotFoundException('Task not found');
        }
        if (userRole === client_1.UserRole.EMPLOYEE && task.createdBy !== userId && task.assignedTo !== userId) {
            throw new common_1.ForbiddenException('Access denied');
        }
        const updatedTask = await this.prisma.task.update({
            where: { id: taskId },
            data: {
                ...updateTaskDto,
                dueDate: updateTaskDto.dueDate ? new Date(updateTaskDto.dueDate) : undefined,
                ...(updateTaskDto.status === client_1.TaskStatus.COMPLETED && {
                    completedAt: new Date(),
                }),
            },
            include: {
                assignedUser: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                creator: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
            },
        });
        return {
            message: 'Task updated successfully',
            task: updatedTask,
        };
    }
    async deleteTask(taskId, userId, userRole) {
        const task = await this.prisma.task.findUnique({
            where: { id: taskId },
        });
        if (!task) {
            throw new common_1.NotFoundException('Task not found');
        }
        if (userRole === client_1.UserRole.EMPLOYEE && task.createdBy !== userId) {
            throw new common_1.ForbiddenException('Access denied');
        }
        await this.prisma.task.delete({
            where: { id: taskId },
        });
        return { message: 'Task deleted successfully' };
    }
    async submitTask(taskId, userId) {
        const task = await this.prisma.task.findUnique({
            where: { id: taskId },
        });
        if (!task) {
            throw new common_1.NotFoundException('Task not found');
        }
        if (task.assignedTo !== userId) {
            throw new common_1.ForbiddenException('Only assigned user can submit task');
        }
        const updatedTask = await this.prisma.task.update({
            where: { id: taskId },
            data: {
                status: client_1.TaskStatus.COMPLETED,
                completedAt: new Date(),
            },
            include: {
                assignedUser: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                creator: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
            },
        });
        return {
            message: 'Task submitted successfully',
            task: updatedTask,
        };
    }
    async getMyServHistory(userId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [tasks, total] = await Promise.all([
            this.prisma.task.findMany({
                where: {
                    OR: [
                        { assignedTo: userId },
                        { createdBy: userId },
                    ],
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
                include: {
                    assignedUser: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                        },
                    },
                    creator: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                        },
                    },
                },
            }),
            this.prisma.task.count({
                where: {
                    OR: [
                        { assignedTo: userId },
                        { createdBy: userId },
                    ],
                },
            }),
        ]);
        return {
            tasks,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    }
    async getAllTasks(userRole, page = 1, limit = 10) {
        if (userRole === client_1.UserRole.EMPLOYEE) {
            throw new common_1.ForbiddenException('Access denied');
        }
        const skip = (page - 1) * limit;
        const [tasks, total] = await Promise.all([
            this.prisma.task.findMany({
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
                include: {
                    assignedUser: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                        },
                    },
                    creator: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                        },
                    },
                },
            }),
            this.prisma.task.count(),
        ]);
        return {
            tasks,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map