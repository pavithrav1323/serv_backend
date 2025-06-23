import { Controller, Post, Put, Get, Delete, Param, Body, Request, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { AddMemberDto } from './dto/add-member.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Teams')
@ApiBearerAuth()
@Controller('api/teams')
export class TeamsController {
  constructor(private teamsService: TeamsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new team' })
  @ApiResponse({ status: 201, description: 'Team created' })
  async createTeam(@Request() req, @Body() dto: CreateTeamDto) {
    return this.teamsService.createTeam(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update a team' })
  @ApiResponse({ status: 200, description: 'Team updated' })
  async updateTeam(@Request() req, @Param('id') id: string, @Body() dto: UpdateTeamDto) {
    return this.teamsService.updateTeam(id, dto, req.user.id, req.user.role);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/members')
  @ApiOperation({ summary: 'Add a member to a team' })
  @ApiResponse({ status: 201, description: 'Member added' })
  async addMember(@Request() req, @Param('id') id: string, @Body() dto: AddMemberDto) {
    return this.teamsService.addMember(id, dto, req.user.id, req.user.role);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/members/:memberId')
  @ApiOperation({ summary: 'Remove a member from a team' })
  @ApiResponse({ status: 200, description: 'Member removed' })
  async removeMember(@Request() req, @Param('id') id: string, @Param('memberId') memberId: string) {
    return this.teamsService.removeMember(id, memberId, req.user.id, req.user.role);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get team details' })
  @ApiResponse({ status: 200, description: 'Team details' })
  async getTeam(@Param('id') id: string) {
    return this.teamsService.getTeam(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my/teams')
  @ApiOperation({ summary: 'Get my teams' })
  @ApiResponse({ status: 200, description: 'My teams' })
  async getMyTeams(@Request() req) {
    return this.teamsService.getMyTeams(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all teams (paginated)' })
  @ApiResponse({ status: 200, description: 'All teams' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getAllTeams(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.teamsService.getAllTeams(page, limit);
  }
} 