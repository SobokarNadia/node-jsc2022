"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const models_1 = require("../models");
const errors_1 = require("../errors");
class UserMiddleware {
    async checkExistence(req, res, next) {
        try {
            const userId = req.params.userId;
            const user = await models_1.User.findById(userId);
            if (!user) {
                throw new errors_1.ApiError("User not found", 422);
            }
            res.locals = { user };
            next();
        }
        catch (e) {
            next(e);
        }
    }
    getDynamicallyAndThrow(fieldName, from = "body", dbField = "email") {
        return async (req, res, next) => {
            try {
                const fieldValue = req[from][fieldName];
                const user = await models_1.User.findOne({ [dbField]: fieldValue });
                if (user)
                    throw new errors_1.ApiError(`User with such ${fieldName} - ${fieldValue} already exists!`, 409);
                next();
            }
            catch (e) {
                next(e);
            }
        };
    }
    getDynamicallyOrThrow(fieldName, from = "body", dbField = "email") {
        return async (req, res, next) => {
            try {
                const fieldValue = req[from][fieldName];
                const user = await models_1.User.findOne({ [dbField]: fieldValue });
                if (!user)
                    throw new errors_1.ApiError("User with such credentials does not exist!", 404);
                res.locals = { user };
                next();
            }
            catch (e) {
                next(e);
            }
        };
    }
}
exports.userMiddleware = new UserMiddleware();
