import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AttendanceModule } from './attendance/attendance.module';
import { RequestsModule } from './requests/requests.module';
import { TasksModule } from './tasks/tasks.module';
import { TeamsModule } from './teams/teams.module';
import { ReportsModule } from './reports/reports.module';
import { RewardsModule } from './rewards/rewards.module';
import { ShiftsModule } from './shifts/shifts.module';
import { EmergencyModule } from './emergency/emergency.module';
import { UtilitiesModule } from './utilities/utilities.module';
import { AdminModule } from './admin/admin.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    AttendanceModule,
    RequestsModule,
    TasksModule,
    TeamsModule,
    ReportsModule,
    RewardsModule,
    ShiftsModule,
    EmergencyModule,
    UtilitiesModule,
    AdminModule,
  ],
})
export class AppModule {} 