"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const enums_1 = require("../enums");
const userSchema = new mongoose_1.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    gender: {
        type: String,
        enum: enums_1.EGnders,
    },
    status: {
        type: String,
        enum: enums_1.EUserStatus,
        default: enums_1.EUserStatus.inactive,
    },
    age: {
        type: Number,
        required: false,
    },
    avatar: {
        type: String,
        required: false,
    },
});
userSchema.statics = {
    async findByName(name) {
        return this.find({ name });
    },
};
userSchema.methods = {
    nameWithAge() {
        return `${this.name} is ${this.age} years old.`;
    },
};
userSchema.virtual("nameWithSurname").get(function () {
    return `${this.name} is ${this.age}`;
});
exports.User = (0, mongoose_1.model)("User", userSchema);
