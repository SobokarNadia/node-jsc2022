"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carMiddleware = void 0;
const models_1 = require("../models");
const errors_1 = require("../errors");
class CarMiddleware {
    async checkExistence(req, res, next) {
        try {
            const { carId } = req.params;
            const car = await models_1.User.findById(carId);
            if (!car) {
                throw new errors_1.ApiError("Car not found", 422);
            }
            res.locals.car = car;
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.carMiddleware = new CarMiddleware();
