import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { UtilitiesService } from './utilities.service';
import { GeocodeDto } from './dto/geocode.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Utilities')
@ApiBearerAuth()
@Controller('api')
export class UtilitiesController {
  constructor(private utilitiesService: UtilitiesService) {}

  @Get('location/geocode')
  @ApiOperation({ summary: 'Convert coordinates to location name' })
  @ApiResponse({ status: 200, description: 'Location fetched' })
  @ApiQuery({ name: 'latitude', required: true, type: Number })
  @ApiQuery({ name: 'longitude', required: true, type: Number })
  async geocode(@Query() query: GeocodeDto) {
    return this.utilitiesService.geocode(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('notifications')
  @ApiOperation({ summary: 'Get user notifications' })
  @ApiResponse({ status: 200, description: 'Notifications fetched' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getNotifications(
    @Request() req,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.utilitiesService.getNotifications(req.user.id, page, limit);
  }
} 