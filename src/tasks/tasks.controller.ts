import { Controller, Post, Get, Put, Delete, Param, Body, Request, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Tasks (MyServ)')
@ApiBearerAuth()
@Controller('api')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Post('myserv/tasks')
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'Task created successfully' })
  async createTask(@Request() req, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(req.user.id, createTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('myserv/tasks')
  @ApiOperation({ summary: 'Get assigned tasks' })
  @ApiResponse({ status: 200, description: 'Tasks fetched successfully' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page' })
  async getMyTasks(
    @Request() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.tasksService.getMyTasks(req.user.id, page, limit);
  }

  @UseGuards(JwtAuthGuard)
  @Get('myserv/tasks/created')
  @ApiOperation({ summary: 'Get tasks created by me' })
  @ApiResponse({ status: 200, description: 'Tasks fetched successfully' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page' })
  async getCreatedTasks(
    @Request() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.tasksService.getCreatedTasks(req.user.id, page, limit);
  }

  @UseGuards(JwtAuthGuard)
  @Get('myserv/tasks/all')
  @ApiOperation({ summary: 'Get all tasks (Admin/Manager only)' })
  @ApiResponse({ status: 200, description: 'All tasks fetched successfully' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page' })
  async getAllTasks(
    @Request() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.tasksService.getAllTasks(req.user.role, page, limit);
  }

  @UseGuards(JwtAuthGuard)
  @Get('myserv/tasks/:id')
  @ApiOperation({ summary: 'Get task by ID' })
  @ApiResponse({ status: 200, description: 'Task fetched successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async getTaskById(@Request() req, @Param('id') id: string) {
    return this.tasksService.getTaskById(id, req.user.id, req.user.role);
  }

  @UseGuards(JwtAuthGuard)
  @Put('myserv/tasks/:id')
  @ApiOperation({ summary: 'Update task' })
  @ApiResponse({ status: 200, description: 'Task updated successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async updateTask(
    @Request() req,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask(id, updateTaskDto, req.user.id, req.user.role);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('myserv/tasks/:id')
  @ApiOperation({ summary: 'Delete task' })
  @ApiResponse({ status: 200, description: 'Task deleted successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async deleteTask(@Request() req, @Param('id') id: string) {
    return this.tasksService.deleteTask(id, req.user.id, req.user.role);
  }

  @UseGuards(JwtAuthGuard)
  @Post('myserv/tasks/:id/submit')
  @ApiOperation({ summary: 'Submit a completed task' })
  @ApiResponse({ status: 200, description: 'Task submitted successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async submitTask(@Request() req, @Param('id') id: string) {
    return this.tasksService.submitTask(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('myserv/history')
  @ApiOperation({ summary: 'Show MyServ usage history' })
  @ApiResponse({ status: 200, description: 'History fetched successfully' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page' })
  async getMyServHistory(
    @Request() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.tasksService.getMyServHistory(req.user.id, page, limit);
  }
} 