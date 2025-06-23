import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamDto {
  @ApiProperty({ description: 'Team name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Team description', required: false })
  @IsOptional()
  @IsString()
  description?: string;
} 