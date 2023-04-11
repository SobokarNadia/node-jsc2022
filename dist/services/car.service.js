"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carService = void 0;
const mongoose_1 = require("mongoose");
const errors_1 = require("../errors");
const models_1 = require("../models");
const car_repository_1 = require("../repositories/car.repository");
class CarService {
    async create(data, userId) {
        try {
            return models_1.Car.create({ ...data, user: new mongoose_1.Types.ObjectId(userId) });
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.error);
        }
    }
    async getById(userId, carId) {
        try {
            return car_repository_1.carRepository.getByUserAndCar(userId, carId);
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.error);
        }
    }
}
exports.carService = new CarService();
