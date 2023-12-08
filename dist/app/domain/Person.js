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
const routing_controllers_1 = require("routing-controllers");
const class_validator_1 = require("class-validator");
const CreatePerson_dto_1 = require("./CreatePerson.dto");
const ApiResponse_1 = require("helpers/ApiResponse");
const ApiError_1 = require("helpers/ApiError");
const HTTPResponseLogger_1 = require("app/middlewares/HTTPResponseLogger");
const storeData = [];
let Person = class Person {
    async getAll() {
        return new ApiResponse_1.ApiResponse(true, storeData);
    }
    async getOne(id) {
        const person = storeData.find((item) => {
            return item.id === id;
        });
        if (!person) {
            throw new ApiError_1.ApiError(404, {
                code: "PERSON_NOT_FOUND",
                message: `Person with id ${id} not found`,
            });
        }
        return new ApiResponse_1.ApiResponse(true, person);
    }
    async setPerson(body) {
        // validate the body using class-validator
        const errors = await (0, class_validator_1.validate)(body);
        if (errors.length > 0) {
            throw new ApiError_1.ApiError(400, {
                message: "Validation failed",
                code: "PERSON_VALIDATION_ERROR",
                // errors,   // ??????????
            });
        }
        const id = storeData.length;
        storeData.push({ ...body, id });
        return new ApiResponse_1.ApiResponse(true, "Person successfully created");
    }
};
__decorate([
    (0, routing_controllers_1.Get)(),
    (0, routing_controllers_1.UseAfter)(HTTPResponseLogger_1.HTTPResponseLogger),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Person.prototype, "getAll", null);
__decorate([
    (0, routing_controllers_1.Get)("/:id"),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], Person.prototype, "getOne", null);
__decorate([
    (0, routing_controllers_1.Post)(),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreatePerson_dto_1.CreatePerson]),
    __metadata("design:returntype", Promise)
], Person.prototype, "setPerson", null);
Person = __decorate([
    (0, routing_controllers_1.JsonController)("/person")
], Person);
exports.default = Person;
//# sourceMappingURL=Person.js.map