"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carRepository = void 0;
const mongoose_1 = require("mongoose");
const models_1 = require("../models");
class CarRepository {
    async getByUserAndCar(userId, carId) {
        const result = await models_1.Car.aggregate([
            {
                $match: {
                    _id: carId,
                    user: new mongoose_1.Types.ObjectId(userId),
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "user",
                },
            },
            {
                $unwind: {
                    path: "$user",
                },
            },
        ]);
        return result[0];
    }
}
exports.carRepository = new CarRepository();
