import { Controller, Post, Get, Put, Delete, Param, Body, Request, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Reports')
@ApiBearerAuth()
@Controller('api/reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a report' })
  @ApiResponse({ status: 201, description: 'Report created' })
  async createReport(@Request() req, @Body() dto: CreateReportDto) {
    return this.reportsService.createReport(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  @ApiOperation({ summary: 'Get my reports' })
  @ApiResponse({ status: 200, description: 'Reports fetched' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getMyReports(@Request() req, @Query('page') page = 1, @Query('limit') limit = 10) {
    return this.reportsService.getMyReports(req.user.id, page, limit);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  @ApiOperation({ summary: 'Get all reports (admin/manager)' })
  @ApiResponse({ status: 200, description: 'All reports fetched' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getAllReports(@Request() req, @Query('page') page = 1, @Query('limit') limit = 10) {
    return this.reportsService.getAllReports(req.user.role, page, limit);
  }

  @UseGuards(JwtAuthGuard)
  @Get('history')
  @ApiOperation({ summary: 'Get my report history' })
  @ApiResponse({ status: 200, description: 'Report history fetched' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getMyReportHistory(@Request() req, @Query('page') page = 1, @Query('limit') limit = 10) {
    return this.reportsService.getMyReportHistory(req.user.id, page, limit);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get report by ID' })
  @ApiResponse({ status: 200, description: 'Report fetched' })
  async getReportById(@Request() req, @Param('id') id: string) {
    return this.reportsService.getReportById(id, req.user.id, req.user.role);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update report' })
  @ApiResponse({ status: 200, description: 'Report updated' })
  async updateReport(@Request() req, @Param('id') id: string, @Body() dto: UpdateReportDto) {
    return this.reportsService.updateReport(id, dto, req.user.id, req.user.role);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete report' })
  @ApiResponse({ status: 200, description: 'Report deleted' })
  async deleteReport(@Request() req, @Param('id') id: string) {
    return this.reportsService.deleteReport(id, req.user.id, req.user.role);
  }
} 