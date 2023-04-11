"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
const mongoose_1 = require("mongoose");
const User_model_1 = require("./User.model");
const carSchema = new mongoose_1.Schema({
    brand: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
    },
    model: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: User_model_1.User,
        required: true,
    },
}, {
    versionKey: false,
    timestamps: true,
});
exports.Car = (0, mongoose_1.model)("Car", carSchema);
