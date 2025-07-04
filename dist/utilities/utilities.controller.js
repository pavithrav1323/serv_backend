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
exports.UtilitiesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const utilities_service_1 = require("./utilities.service");
const geocode_dto_1 = require("./dto/geocode.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let UtilitiesController = class UtilitiesController {
    constructor(utilitiesService) {
        this.utilitiesService = utilitiesService;
    }
    async geocode(query) {
        return this.utilitiesService.geocode(query);
    }
    async getNotifications(req, page = 1, limit = 10) {
        return this.utilitiesService.getNotifications(req.user.id, page, limit);
    }
};
exports.UtilitiesController = UtilitiesController;
__decorate([
    (0, common_1.Get)('location/geocode'),
    (0, swagger_1.ApiOperation)({ summary: 'Convert coordinates to location name' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Location fetched' }),
    (0, swagger_1.ApiQuery)({ name: 'latitude', required: true, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'longitude', required: true, type: Number }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [geocode_dto_1.GeocodeDto]),
    __metadata("design:returntype", Promise)
], UtilitiesController.prototype, "geocode", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('notifications'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user notifications' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Notifications fetched' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UtilitiesController.prototype, "getNotifications", null);
exports.UtilitiesController = UtilitiesController = __decorate([
    (0, swagger_1.ApiTags)('Utilities'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [utilities_service_1.UtilitiesService])
], UtilitiesController);
//# sourceMappingURL=utilities.controller.js.map