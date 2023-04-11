"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const services_1 = require("../services");
class AuthController {
    async register(req, res, next) {
        try {
            await services_1.authService.register(req.body);
            const actionToken = await services_1.authService.activateUser(req.body.email);
            res.status(201).json(actionToken);
        }
        catch (e) {
            next(e);
        }
    }
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const { user } = res.locals;
            const tokenPair = await services_1.authService.login({
                email,
                password,
            }, user);
            return res.status(200).json(tokenPair);
        }
        catch (e) {
            next(e);
        }
    }
    async refresh(req, res, next) {
        try {
            const { tokenInfo, jwtPayload } = res.locals;
            const tokenPair = await services_1.authService.refresh(tokenInfo, jwtPayload);
            return res.status(200).json(tokenPair);
        }
        catch (e) {
            next(e);
        }
    }
    async changePassword(req, res, next) {
        try {
            const { tokenInfo } = req.res.locals;
            const { oldPassword, newPassword } = req.body;
            await services_1.authService.changePassword(tokenInfo._user_id, oldPassword, newPassword);
            res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    }
    async forgotPassword(req, res, next) {
        try {
            const { user } = res.locals;
            const actionToken = await services_1.authService.forgotPassword(user);
            res.status(200).json(actionToken);
        }
        catch (e) {
            next(e);
        }
    }
    async setForgotPassword(req, res, next) {
        try {
            const { tokenInfo: { _user_id }, } = req.res.locals;
            const { newPassword } = req.body;
            await services_1.authService.setForgotPassword(_user_id, newPassword);
            res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    }
    async activate(req, res, next) {
        try {
            const { tokenInfo } = req.res.locals;
            await services_1.authService.setUserActivate(tokenInfo._user_id);
            res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.authController = new AuthController();
