import { Controller, Post, Get, Body, Request, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { AttendanceService } from './attendance.service';
import { CheckInDto } from './dto/check-in.dto';
import { CheckOutDto } from './dto/check-out.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Attendance')
@ApiBearerAuth()
@Controller('api/attendance')
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}

  @UseGuards(JwtAuthGuard)
  @Post('check-in')
  @ApiOperation({ summary: 'Submit check-in time, shift, and optionally location' })
  @ApiResponse({ status: 201, description: 'Check-in successful' })
  @ApiResponse({ status: 400, description: 'User already checked in' })
  async checkIn(@Request() req, @Body() checkInDto: CheckInDto) {
    return this.attendanceService.checkIn(req.user.id, checkInDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('check-out')
  @ApiOperation({ summary: 'Submit check-out time' })
  @ApiResponse({ status: 200, description: 'Check-out successful' })
  @ApiResponse({ status: 400, description: 'No active attendance record found' })
  async checkOut(@Request() req, @Body() checkOutDto: CheckOutDto) {
    return this.attendanceService.checkOut(req.user.id, checkOutDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('timer')
  @ApiOperation({ summary: 'Fetch current timer details if resumed' })
  @ApiResponse({ status: 200, description: 'Timer details fetched successfully' })
  async getTimer(@Request() req) {
    return this.attendanceService.getTimer(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('history')
  @ApiOperation({ summary: 'Fetch user\'s attendance history' })
  @ApiResponse({ status: 200, description: 'Attendance history fetched successfully' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page' })
  async getHistory(
    @Request() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.attendanceService.getHistory(req.user.id, page, limit);
  }

  @UseGuards(JwtAuthGuard)
  @Get('quote')
  @ApiOperation({ summary: 'Fetch a motivational quote' })
  @ApiResponse({ status: 200, description: 'Quote fetched successfully' })
  async getQuote() {
    return this.attendanceService.getQuote();
  }
} 