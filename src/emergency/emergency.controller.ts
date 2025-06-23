import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EmergencyService } from './emergency.service';
import { EmergencyAlertDto } from './dto/emergency-alert.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Emergency')
@ApiBearerAuth()
@Controller('api/emergency')
export class EmergencyController {
  constructor(private emergencyService: EmergencyService) {}

  @UseGuards(JwtAuthGuard)
  @Post('alert')
  @ApiOperation({ summary: 'Send emergency alert with location/time' })
  @ApiResponse({ status: 201, description: 'Emergency alert sent' })
  async sendEmergencyAlert(@Request() req, @Body() dto: EmergencyAlertDto) {
    return this.emergencyService.sendEmergencyAlert(req.user.id, dto);
  }
} 