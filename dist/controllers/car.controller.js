"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carController = void 0;
const models_1 = require("../models");
const services_1 = require("../services");
class CarController {
    async getById(req, res, next) {
        try {
            const { car } = res.locals;
            return res.status(200).json(car);
        }
        catch (e) {
            next(e);
        }
    }
    async create(req, res, next) {
        try {
            const { _id } = req.res.locals;
            const car = await services_1.carService.create(req.body, _id);
            return res.json(car);
        }
        catch (e) {
            next(e);
        }
    }
    async update(req, res, next) {
        try {
            const { carId } = req.params;
            const car = await models_1.Car.findByIdAndUpdate(carId, { ...req.body }, { new: true });
            return res.status(200).json(car);
        }
        catch (e) {
            next(e);
        }
    }
    async delete(req, res, next) {
        try {
            const { carId } = req.params;
            await models_1.Car.deleteOne({ _id: carId });
            return res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.carController = new CarController();
