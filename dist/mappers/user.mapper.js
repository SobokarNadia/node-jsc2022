"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMapper = void 0;
const configs_1 = require("../configs");
class UserMapper {
    toResponse(user) {
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar
                ? `${configs_1.configs.AWS_S3_BUCKET_URL}/${user.avatar}`
                : null,
        };
    }
    toManyResponse(users) {
        return users.map(this.toResponse);
    }
}
exports.userMapper = new UserMapper();
