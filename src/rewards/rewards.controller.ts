import { Controller, Post, Get, Put, Delete, Param, Body, Request, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { RewardsService } from './rewards.service';
import { CreateRewardDto } from './dto/create-reward.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Rewards')
@ApiBearerAuth()
@Controller('api/rewards')
export class RewardsController {
  constructor(private rewardsService: RewardsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Add a reward to a user (admin/manager)' })
  @ApiResponse({ status: 201, description: 'Reward created' })
  async createReward(@Request() req, @Body() dto: CreateRewardDto) {
    return this.rewardsService.createReward(dto, req.user.role);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  @ApiOperation({ summary: 'Get my rewards' })
  @ApiResponse({ status: 200, description: 'Rewards fetched' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getMyRewards(@Request() req, @Query('page') page = 1, @Query('limit') limit = 10) {
    return this.rewardsService.getMyRewards(req.user.id, page, limit);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  @ApiOperation({ summary: 'Get all rewards (admin/manager)' })
  @ApiResponse({ status: 200, description: 'All rewards fetched' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getAllRewards(@Request() req, @Query('page') page = 1, @Query('limit') limit = 10) {
    return this.rewardsService.getAllRewards(req.user.role, page, limit);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get reward by ID' })
  @ApiResponse({ status: 200, description: 'Reward fetched' })
  async getRewardById(@Request() req, @Param('id') id: string) {
    return this.rewardsService.getRewardById(id, req.user.id, req.user.role);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/redeem')
  @ApiOperation({ summary: 'Redeem a reward' })
  @ApiResponse({ status: 200, description: 'Reward redeemed' })
  async redeemReward(@Request() req, @Param('id') id: string) {
    return this.rewardsService.redeemReward(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a reward (admin/manager)' })
  @ApiResponse({ status: 200, description: 'Reward deleted' })
  async deleteReward(@Request() req, @Param('id') id: string) {
    return this.rewardsService.deleteReward(id, req.user.role);
  }
} 