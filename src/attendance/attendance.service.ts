import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CheckInDto } from './dto/check-in.dto';
import { CheckOutDto } from './dto/check-out.dto';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  async checkIn(userId: string, checkInDto: CheckInDto) {
    // Check if user already has an active attendance record
    const activeAttendance = await this.prisma.attendance.findFirst({
      where: {
        userId,
        checkOut: null,
        isActive: true,
      },
    });

    if (activeAttendance) {
      throw new BadRequestException('User already checked in');
    }

    const attendance = await this.prisma.attendance.create({
      data: {
        userId,
        checkIn: new Date(),
        shift: checkInDto.shift,
        location: checkInDto.location,
        latitude: checkInDto.latitude,
        longitude: checkInDto.longitude,
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
      message: 'Check-in successful',
      attendance,
    };
  }

  async checkOut(userId: string, checkOutDto: CheckOutDto) {
    const activeAttendance = await this.prisma.attendance.findFirst({
      where: {
        userId,
        checkOut: null,
        isActive: true,
      },
    });

    if (!activeAttendance) {
      throw new BadRequestException('No active attendance record found');
    }

    const updatedAttendance = await this.prisma.attendance.update({
      where: { id: activeAttendance.id },
      data: {
        checkOut: new Date(),
        location: checkOutDto.location || activeAttendance.location,
        latitude: checkOutDto.latitude || activeAttendance.latitude,
        longitude: checkOutDto.longitude || activeAttendance.longitude,
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

    // Calculate duration
    const duration = this.calculateDuration(updatedAttendance.checkIn, updatedAttendance.checkOut);

    return {
      message: 'Check-out successful',
      attendance: updatedAttendance,
      duration,
    };
  }

  async getTimer(userId: string) {
    const activeAttendance = await this.prisma.attendance.findFirst({
      where: {
        userId,
        checkOut: null,
        isActive: true,
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

    if (!activeAttendance) {
      return { message: 'No active timer found' };
    }

    const currentTime = new Date();
    const duration = this.calculateDuration(activeAttendance.checkIn, currentTime);

    return {
      activeAttendance,
      currentTime,
      duration,
    };
  }

  async getHistory(userId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [attendances, total] = await Promise.all([
      this.prisma.attendance.findMany({
        where: {
          userId,
          isActive: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
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
      this.prisma.attendance.count({
        where: {
          userId,
          isActive: true,
        },
      }),
    ]);

    // Calculate duration for each attendance record
    const attendancesWithDuration = attendances.map(attendance => ({
      ...attendance,
      duration: attendance.checkOut 
        ? this.calculateDuration(attendance.checkIn, attendance.checkOut)
        : null,
    }));

    return {
      attendances: attendancesWithDuration,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getQuote() {
    const quotes = [
      "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      "The only way to do great work is to love what you do.",
      "Don't watch the clock; do what it does. Keep going.",
      "The future depends on what you do today.",
      "It always seems impossible until it's done.",
      "The only limit to our realization of tomorrow will be our doubts of today.",
      "What you get by achieving your goals is not as important as what you become by achieving your goals.",
      "The way to get started is to quit talking and begin doing.",
      "Success usually comes to those who are too busy to be looking for it.",
      "The harder you work for something, the greater you'll feel when you achieve it.",
    ];

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    return {
      quote: randomQuote,
      author: "Motivational Quote",
    };
  }

  private calculateDuration(startTime: Date, endTime: Date): string {
    const diffInMs = endTime.getTime() - startTime.getTime();
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
} 