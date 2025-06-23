import { Controller, Get, Post, Query, Body, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateShiftDto } from '../shifts/dto/create-shift.dto';

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('api/admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @UseGuards(JwtAuthGuard)
  @Get('users')
  @ApiOperation({ summary: 'List all users' })
  @ApiResponse({ status: 200, description: 'Users fetched' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async listUsers(@Request() req, @Query('page') page = 1, @Query('limit') limit = 10) {
    return this.adminService.listUsers(req.user.role, page, limit);
  }

  @UseGuards(JwtAuthGuard)
  @Get('attendance')
  @ApiOperation({ summary: 'List/filter attendance records' })
  @ApiResponse({ status: 200, description: 'Attendance records fetched' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'userId', required: false, type: String })
  async listAttendance(
    @Request() req,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('userId') userId?: string,
  ) {
    return this.adminService.listAttendance(req.user.role, page, limit, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('shifts')
  @ApiOperation({ summary: 'Add a new shift (admin/manager)' })
  @ApiResponse({ status: 201, description: 'Shift created' })
  async createShift(@Request() req, @Body() dto: CreateShiftDto) {
    return this.adminService.createShift(req.user.role, dto);
  }
} 