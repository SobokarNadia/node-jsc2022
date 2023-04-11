"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OldPassword = void 0;
const mongoose_1 = require("mongoose");
const User_model_1 = require("./User.model");
const oldPasswordSchema = new mongoose_1.Schema({
    _user_id: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: User_model_1.User,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.OldPassword = (0, mongoose_1.model)("oldPasswords", oldPasswordSchema);
