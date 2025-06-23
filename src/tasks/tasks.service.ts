import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus, UserRole } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async createTask(userId: string, createTaskDto: CreateTaskDto) {
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

  async getMyTasks(userId: string, page: number = 1, limit: number = 10) {
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

  async getCreatedTasks(userId: string, page: number = 1, limit: number = 10) {
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

  async getTaskById(taskId: string, userId: string, userRole: UserRole) {
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
      throw new NotFoundException('Task not found');
    }

    // Only allow access if user is admin/manager, the task creator, or the assigned user
    if (userRole === UserRole.EMPLOYEE && task.createdBy !== userId && task.assignedTo !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return task;
  }

  async updateTask(taskId: string, updateTaskDto: UpdateTaskDto, userId: string, userRole: UserRole) {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    // Only allow updates if user is admin/manager, the task creator, or the assigned user
    if (userRole === UserRole.EMPLOYEE && task.createdBy !== userId && task.assignedTo !== userId) {
      throw new ForbiddenException('Access denied');
    }

    const updatedTask = await this.prisma.task.update({
      where: { id: taskId },
      data: {
        ...updateTaskDto,
        dueDate: updateTaskDto.dueDate ? new Date(updateTaskDto.dueDate) : undefined,
        // If status is being updated to COMPLETED, set completedAt
        ...(updateTaskDto.status === TaskStatus.COMPLETED && {
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

  async deleteTask(taskId: string, userId: string, userRole: UserRole) {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    // Only allow deletion if user is admin/manager or the task creator
    if (userRole === UserRole.EMPLOYEE && task.createdBy !== userId) {
      throw new ForbiddenException('Access denied');
    }

    await this.prisma.task.delete({
      where: { id: taskId },
    });

    return { message: 'Task deleted successfully' };
  }

  async submitTask(taskId: string, userId: string) {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.assignedTo !== userId) {
      throw new ForbiddenException('Only assigned user can submit task');
    }

    const updatedTask = await this.prisma.task.update({
      where: { id: taskId },
      data: {
        status: TaskStatus.COMPLETED,
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

  async getMyServHistory(userId: string, page: number = 1, limit: number = 10) {
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

  async getAllTasks(userRole: UserRole, page: number = 1, limit: number = 10) {
    if (userRole === UserRole.EMPLOYEE) {
      throw new ForbiddenException('Access denied');
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
} 