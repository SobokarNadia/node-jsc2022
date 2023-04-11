"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const models_1 = require("../models");
const errors_1 = require("../errors");
const services_1 = require("../services");
const enums_1 = require("../enums");
class AuthMiddleware {
    async checkAccessToken(req, res, next) {
        try {
            const accessToken = req.get("Authorization");
            if (!accessToken)
                throw new errors_1.ApiError("Access token is absent", 422);
            const jwtPayload = services_1.tokenService.checkToken(accessToken, enums_1.ETokenType.access);
            const tokenInfo = await models_1.Token.findOne({ accessToken });
            if (!tokenInfo)
                throw new errors_1.ApiError("Access token is not valid", 422);
            req.res.locals = { tokenInfo, jwtPayload };
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async checkRefreshToken(req, res, next) {
        try {
            const refreshToken = req.get("Authorization");
            if (!refreshToken)
                throw new errors_1.ApiError("Refresh token is absent", 422);
            const jwtPayload = await services_1.tokenService.checkToken(refreshToken, enums_1.ETokenType.refresh);
            const tokenInfo = await models_1.Token.findOne({ refreshToken });
            if (!tokenInfo)
                throw new errors_1.ApiError("Refresh token is not valid", 422);
            req.res.locals = { tokenInfo, jwtPayload };
            next();
        }
        catch (e) {
            next(e);
        }
    }
    checkActionToken(actionType) {
        return async (req, res, next) => {
            try {
                const actionToken = req.params.token;
                if (!actionToken)
                    throw new errors_1.ApiError("Action token is absent", 422);
                const jwtPayload = await services_1.tokenService.checkActionToken(actionToken, actionType);
                const tokenInfo = await models_1.ActionToken.findOne({ actionToken });
                if (!tokenInfo)
                    throw new errors_1.ApiError("Action token is not valid", 422);
                req.res.locals = { tokenInfo, jwtPayload };
                next();
            }
            catch (e) {
                next(e);
            }
        };
    }
    async checkOldPassword(req, res, next) {
        try {
            const { tokenInfo: { _user_id }, } = req.res.locals;
            const { newPassword } = req.body;
            const oldPasswords = await models_1.OldPassword.find({ _user_id });
            if (oldPasswords.length === 0)
                return next();
            await Promise.all(oldPasswords.map(async (record) => {
                const isMatch = await services_1.passwordService.compare(newPassword, record.password);
                if (isMatch) {
                    throw new errors_1.ApiError("You should enter totally new password!", 409);
                }
            }));
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.authMiddleware = new AuthMiddleware();
