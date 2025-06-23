import { IsString, IsOptional, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRewardDto {
  @ApiProperty({ description: 'User ID to reward' })
  @IsString()
  userId: string;

  @ApiProperty({ description: 'Reward type' })
  @IsString()
  type: string;

  @ApiProperty({ description: 'Reward title' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Reward description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Reward points', required: false })
  @IsOptional()
  @IsInt()
  points?: number;
} 