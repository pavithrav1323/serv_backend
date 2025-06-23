import { Controller, Post, Get, Put, Param, Body, Request, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ShiftsService } from './shifts.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Shifts')
@ApiBearerAuth()
@Controller('api/shifts')
export class ShiftsController {
  constructor(private shiftsService: ShiftsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Add a new shift (admin/manager)' })
  @ApiResponse({ status: 201, description: 'Shift created' })
  async createShift(@Request() req, @Body() dto: CreateShiftDto) {
    return this.shiftsService.createShift(dto, req.user.role);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update a shift (admin/manager)' })
  @ApiResponse({ status: 200, description: 'Shift updated' })
  async updateShift(@Request() req, @Param('id') id: string, @Body() dto: UpdateShiftDto) {
    return this.shiftsService.updateShift(id, dto, req.user.role);
  }

  @Get()
  @ApiOperation({ summary: 'Get list of available shifts' })
  @ApiResponse({ status: 200, description: 'Shifts fetched' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getShifts(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.shiftsService.getShifts(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get specific shift details' })
  @ApiResponse({ status: 200, description: 'Shift fetched' })
  async getShiftById(@Param('id') id: string) {
    return this.shiftsService.getShiftById(id);
  }
} 