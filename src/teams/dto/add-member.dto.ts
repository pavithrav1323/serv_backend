import { IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TeamRole } from '@prisma/client';

export class AddMemberDto {
  @ApiProperty({ description: 'User ID to add' })
  @IsString()
  userId: string;

  @ApiProperty({ description: 'Role in team', enum: TeamRole })
  @IsEnum(TeamRole)
  role: TeamRole;
} 