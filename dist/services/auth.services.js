"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const password_service_1 = require("./password.service");
const models_1 = require("../models");
const errors_1 = require("../errors");
const token_service_1 = require("./token.service");
const email_service_1 = require("./email.service");
const enums_1 = require("../enums");
class AuthService {
    async register(body) {
        try {
            const hashedPassword = await password_service_1.passwordService.hash(body.password);
            await models_1.User.create({
                ...body,
                password: hashedPassword,
            });
            await email_service_1.emailService.sendMail("sobokar.be@gmail.com", enums_1.EEmailAction.WELCOME);
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.error);
        }
    }
    async login(loginData, user) {
        try {
            const isMatched = await password_service_1.passwordService.compare(loginData.password, user.password);
            if (!isMatched)
                throw new errors_1.ApiError("Email or password is not valid!", 400);
            const tokenPair = token_service_1.tokenService.generateTokenPair({
                _id: user._id,
                name: user.name,
            });
            await models_1.Token.create({
                _user_id: user._id,
                ...tokenPair,
            });
            return tokenPair;
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async refresh(tokenInfo, jwtPayload) {
        try {
            const tokenPair = token_service_1.tokenService.generateTokenPair({
                _id: jwtPayload._id,
                name: jwtPayload.name,
            });
            await Promise.all([
                models_1.Token.create({
                    _user_id: jwtPayload._id,
                    ...tokenPair,
                }),
                models_1.Token.deleteOne({ refreshToken: tokenInfo.refreshToken }),
            ]);
            return tokenPair;
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async changePassword(userId, oldPassword, newPassword) {
        try {
            const user = await models_1.User.findById(userId);
            const isMatch = await password_service_1.passwordService.compare(oldPassword, user.password);
            if (!isMatch)
                throw new errors_1.ApiError("Password is not valid", 400);
            const newHashedPassword = await password_service_1.passwordService.hash(newPassword);
            await models_1.User.updateOne({ _id: user._id }, {
                $set: {
                    password: newHashedPassword,
                },
            });
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async forgotPassword(user) {
        try {
            const actionToken = token_service_1.tokenService.generateActionToken({ _id: user._id }, enums_1.EActionTokenType.forgot);
            await models_1.ActionToken.create({
                _user_id: user._id,
                actionToken,
                actionType: enums_1.EActionTokenType.forgot,
            });
            await email_service_1.emailService.sendMail(user.email, enums_1.EEmailAction.FORGOT_PASSWORD, {
                token: actionToken,
            });
            await models_1.OldPassword.create({ _user_id: user._id, password: user.password });
            return actionToken;
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async setForgotPassword(userId, newPassword) {
        try {
            const newHashedPassword = await password_service_1.passwordService.hash(newPassword);
            await models_1.User.updateOne({ _id: userId }, { $set: { password: newHashedPassword } });
            await models_1.ActionToken.deleteMany({
                _user_id: userId,
                actionType: enums_1.EActionTokenType.forgot,
            });
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async activateUser(email) {
        try {
            const user = await models_1.User.findOne({ email: email });
            const actionToken = token_service_1.tokenService.generateActionToken({ _id: user._id }, enums_1.EActionTokenType.activate);
            await Promise.all([
                await models_1.ActionToken.create({
                    _user_id: user._id,
                    actionToken,
                    actionType: enums_1.EActionTokenType.activate,
                }),
                await email_service_1.emailService.sendMail("sobokar.be@gmail.com", enums_1.EEmailAction.ACTIVATE, {
                    token: actionToken,
                }),
            ]);
            return actionToken;
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async setUserActivate(userId) {
        try {
            await models_1.ActionToken.deleteMany({
                _user_id: userId,
                actionType: enums_1.EActionTokenType.activate,
            });
            await models_1.User.updateOne({ _id: userId }, { $set: { status: enums_1.EUserStatus.active } });
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
}
exports.authService = new AuthService();
