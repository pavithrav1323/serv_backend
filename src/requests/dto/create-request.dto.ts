import { IsString, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RequestType } from '@prisma/client';

export class CreateRequestDto {
  @ApiProperty({ description: 'Request type', enum: RequestType })
  @IsEnum(RequestType)
  type: RequestType;

  @ApiProperty({ description: 'Request title' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Request description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Start date', required: false })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({ description: 'End date', required: false })
  @IsOptional()
  @IsDateString()
  endDate?: string;
} 