"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonMiddleware = void 0;
const mongoose_1 = require("mongoose");
const errors_1 = require("../errors");
class CommonMiddleware {
    isUserIdValid(idField, from = "params") {
        return async (req, res, next) => {
            try {
                if (!(0, mongoose_1.isObjectIdOrHexString)(req[from][idField]))
                    throw new errors_1.ApiError("User id is not valid!", 400);
                next();
            }
            catch (e) {
                next(e);
            }
        };
    }
    isBodyValid(validator) {
        return async (req, res, next) => {
            try {
                const { error, value } = validator.validate(req.body);
                if (error)
                    throw new errors_1.ApiError(error.message, 400);
                req.body = value;
                next();
            }
            catch (e) {
                next(e);
            }
        };
    }
}
exports.commonMiddleware = new CommonMiddleware();
