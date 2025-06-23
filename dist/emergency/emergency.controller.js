"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmergencyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const emergency_service_1 = require("./emergency.service");
const emergency_alert_dto_1 = require("./dto/emergency-alert.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let EmergencyController = class EmergencyController {
    constructor(emergencyService) {
        this.emergencyService = emergencyService;
    }
    async sendEmergencyAlert(req, dto) {
        return this.emergencyService.sendEmergencyAlert(req.user.id, dto);
    }
};
exports.EmergencyController = EmergencyController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('alert'),
    (0, swagger_1.ApiOperation)({ summary: 'Send emergency alert with location/time' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Emergency alert sent' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, emergency_alert_dto_1.EmergencyAlertDto]),
    __metadata("design:returntype", Promise)
], EmergencyController.prototype, "sendEmergencyAlert", null);
exports.EmergencyController = EmergencyController = __decorate([
    (0, swagger_1.ApiTags)('Emergency'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('api/emergency'),
    __metadata("design:paramtypes", [emergency_service_1.EmergencyService])
], EmergencyController);
//# sourceMappingURL=emergency.controller.js.map