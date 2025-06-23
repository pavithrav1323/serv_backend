import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { RequestStatus, UserRole } from '@prisma/client';

@Injectable()
export class RequestsService {
  constructor(private prisma: PrismaService) {}

  async createRequest(userId: string, createRequestDto: CreateRequestDto) {
    const request = await this.prisma.request.create({
      data: {
        userId,
        type: createRequestDto.type,
        title: createRequestDto.title,
        description: createRequestDto.description,
        startDate: createRequestDto.startDate ? new Date(createRequestDto.startDate) : null,
        endDate: createRequestDto.endDate ? new Date(createRequestDto.endDate) : null,
      },
      include: {
        user: {
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
      message: 'Request created successfully',
      request,
    };
  }

  async getMyRequests(userId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [requests, total] = await Promise.all([
      this.prisma.request.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      }),
      this.prisma.request.count({ where: { userId } }),
    ]);

    return {
      requests,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getRequestById(requestId: string, userId: string, userRole: UserRole) {
    const request = await this.prisma.request.findUnique({
      where: { id: requestId },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    if (!request) {
      throw new NotFoundException('Request not found');
    }

    // Only allow access if user is admin/manager or the request owner
    if (userRole === UserRole.EMPLOYEE && request.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return request;
  }

  async updateRequest(requestId: string, updateRequestDto: UpdateRequestDto, userId: string, userRole: UserRole) {
    const request = await this.prisma.request.findUnique({
      where: { id: requestId },
    });

    if (!request) {
      throw new NotFoundException('Request not found');
    }

    // Only allow updates if user is admin/manager or the request owner (and status is PENDING)
    if (userRole === UserRole.EMPLOYEE) {
      if (request.userId !== userId) {
        throw new ForbiddenException('Access denied');
      }
      if (request.status !== RequestStatus.PENDING) {
        throw new ForbiddenException('Cannot update non-pending request');
      }
    }

    const updatedRequest = await this.prisma.request.update({
      where: { id: requestId },
      data: {
        ...updateRequestDto,
        startDate: updateRequestDto.startDate ? new Date(updateRequestDto.startDate) : undefined,
        endDate: updateRequestDto.endDate ? new Date(updateRequestDto.endDate) : undefined,
        // If status is being updated to APPROVED/REJECTED, set approvedBy and approvedAt
        ...(updateRequestDto.status && (updateRequestDto.status === RequestStatus.APPROVED || updateRequestDto.status === RequestStatus.REJECTED) && {
          approvedBy: userId,
          approvedAt: new Date(),
        }),
      },
      include: {
        user: {
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
      message: 'Request updated successfully',
      request: updatedRequest,
    };
  }

  async deleteRequest(requestId: string, userId: string, userRole: UserRole) {
    const request = await this.prisma.request.findUnique({
      where: { id: requestId },
    });

    if (!request) {
      throw new NotFoundException('Request not found');
    }

    // Only allow deletion if user is admin/manager or the request owner (and status is PENDING)
    if (userRole === UserRole.EMPLOYEE) {
      if (request.userId !== userId) {
        throw new ForbiddenException('Access denied');
      }
      if (request.status !== RequestStatus.PENDING) {
        throw new ForbiddenException('Cannot delete non-pending request');
      }
    }

    await this.prisma.request.delete({
      where: { id: requestId },
    });

    return { message: 'Request deleted successfully' };
  }

  async getAllRequests(userRole: UserRole, page: number = 1, limit: number = 10) {
    if (userRole === UserRole.EMPLOYEE) {
      throw new ForbiddenException('Access denied');
    }

    const skip = (page - 1) * limit;

    const [requests, total] = await Promise.all([
      this.prisma.request.findMany({
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      }),
      this.prisma.request.count(),
    ]);

    return {
      requests,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }
} 