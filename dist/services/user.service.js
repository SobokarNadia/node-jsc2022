"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const errors_1 = require("../errors");
const models_1 = require("../models");
const s3_service_1 = require("./s3.service");
class UserService {
    async getWithPagination(query) {
        try {
            const queryStringify = JSON.stringify(query);
            const queryObj = JSON.parse(queryStringify.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`));
            const { page = 1, perPage = 5, sortedBy = "createdAt", ...searchObj } = queryObj;
            const skip = perPage * (page - 1);
            const users = await models_1.User.find(searchObj)
                .limit(perPage)
                .skip(skip)
                .sort(sortedBy)
                .lean();
            const totalItems = await models_1.User.count();
            return {
                page: +page,
                totalItems,
                perPage: +perPage,
                itemsFound: users.length,
                data: userMapper.toManyResponse(users),
            };
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.error);
        }
    }
    async getById(id) {
        try {
            return models_1.User.findById(id).lean();
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.error);
        }
    }
    async update(userId, data) {
        try {
            return await models_1.User.findByIdAndUpdate(userId, data, { new: true });
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.error);
        }
    }
    async uploadAvatar(file, user) {
        try {
            if (user.avatar) {
                await s3_service_1.s3Service.deletePhoto(user.avatar);
            }
            const uploadedFile = await s3_service_1.s3Service.uploadPhoto(file, "user", user._id);
            return await models_1.User.findByIdAndUpdate(user._id, { avatar: uploadedFile }, { new: true });
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.error);
        }
    }
    async deleteAvatar(user) {
        try {
            if (!user.avatar)
                throw new errors_1.ApiError("Avatar doesn't exist, anyway!", 422);
            await s3_service_1.s3Service.deletePhoto(user.avatar);
            return await models_1.User.findByIdAndUpdate(user._id, { $unset: { avatar: "" } }, { new: true });
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.error);
        }
    }
    async delete(userId) {
        try {
            return await models_1.User.deleteOne({ _id: userId });
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.error);
        }
    }
}
exports.userService = new UserService();
