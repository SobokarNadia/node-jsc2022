"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionToken = void 0;
const mongoose_1 = require("mongoose");
const User_model_1 = require("./User.model");
const enums_1 = require("../enums");
const actionTokenSchema = new mongoose_1.Schema({
    _user_id: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: User_model_1.User,
    },
    actionToken: {
        type: String,
        required: true,
    },
    actionType: {
        type: String,
        enum: enums_1.EActionTokenType,
        required: true,
    },
}, {
    versionKey: false,
    timestamp: true,
});
exports.ActionToken = (0, mongoose_1.model)("ActionToken", actionTokenSchema);
