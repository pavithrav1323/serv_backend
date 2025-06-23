import { IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ReportType } from '@prisma/client';

export class CreateReportDto {
  @ApiProperty({ description: 'Report type', enum: ReportType })
  @IsEnum(ReportType)
  type: ReportType;

  @ApiProperty({ description: 'Report title' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Report content' })
  @IsString()
  content: string;
} 