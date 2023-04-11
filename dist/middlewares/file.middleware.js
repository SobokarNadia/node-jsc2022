"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileMiddleware = void 0;
const errors_1 = require("../errors");
const configs_1 = require("../configs");
class FileMiddleware {
    async isFileValid(req, res, next) {
        try {
            if (!req.files)
                throw new errors_1.ApiError("File is absent", 400);
            if (Array.isArray(req.files.avatar))
                throw new errors_1.ApiError("You can upload only one photo", 400);
            const { size, mimetype } = req.files.avatar;
            if (size <= configs_1.avatarConfigs.MAX_SIZE)
                throw new errors_1.ApiError("Your avatart is too big", 400);
            if (!configs_1.avatarConfigs.MIMETYPES.includes(mimetype))
                throw new errors_1.ApiError("Only jpeg/png/gif are allowed. Chose" + " another file please", 400);
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.fileMiddleware = new FileMiddleware();
