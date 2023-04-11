"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const services_1 = require("../services");
const mappers_1 = require("../mappers");
class UserController {
    async getAll(req, res, next) {
        try {
            const response = await services_1.userService.getWithPagination(req.query);
            return res.status(200).json(response);
        }
        catch (e) {
            next(e);
        }
    }
    async getById(req, res, next) {
        try {
            const { user } = res.locals;
            const response = mappers_1.userMapper.toResponse(user);
            return res.status(200).json(response);
        }
        catch (e) {
            next(e);
        }
    }
    async update(req, res, next) {
        try {
            const { params, body } = req;
            const user = await services_1.userService.update(params.userId, body);
            const response = mappers_1.userMapper.toResponse(user);
            return res.status(200).json(response);
        }
        catch (e) {
            next(e);
        }
    }
    async uploadAvatar(req, res, next) {
        try {
            const user = res.locals.user;
            const avatar = req.files.avatar;
            const newUser = await services_1.userService.uploadAvatar(avatar, user);
            console.log(newUser);
            const response = mappers_1.userMapper.toResponse(newUser);
            return res.status(200).json(response);
        }
        catch (e) {
            next(e);
        }
    }
    async deleteAvatar(req, res, next) {
        try {
            const user = res.locals.user;
            const newUser = await services_1.userService.deleteAvatar(user);
            console.log(newUser);
            const response = mappers_1.userMapper.toResponse(newUser);
            return res.status(200).json(response);
        }
        catch (e) {
            next(e);
        }
    }
    async delete(req, res, next) {
        try {
            const { userId } = req.params;
            await services_1.userService.delete(userId);
            return res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userController = new UserController();
