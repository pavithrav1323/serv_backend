"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const attendance_module_1 = require("./attendance/attendance.module");
const requests_module_1 = require("./requests/requests.module");
const tasks_module_1 = require("./tasks/tasks.module");
const teams_module_1 = require("./teams/teams.module");
const reports_module_1 = require("./reports/reports.module");
const rewards_module_1 = require("./rewards/rewards.module");
const shifts_module_1 = require("./shifts/shifts.module");
const emergency_module_1 = require("./emergency/emergency.module");
const utilities_module_1 = require("./utilities/utilities.module");
const admin_module_1 = require("./admin/admin.module");
const prisma_module_1 = require("./prisma/prisma.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            attendance_module_1.AttendanceModule,
            requests_module_1.RequestsModule,
            tasks_module_1.TasksModule,
            teams_module_1.TeamsModule,
            reports_module_1.ReportsModule,
            rewards_module_1.RewardsModule,
            shifts_module_1.ShiftsModule,
            emergency_module_1.EmergencyModule,
            utilities_module_1.UtilitiesModule,
            admin_module_1.AdminModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map