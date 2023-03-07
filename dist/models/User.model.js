"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_types_1 = require("../types/user.types");
const userSchema = new mongoose_1.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: user_types_1.EGenders,
  },
});
exports.User = (0, mongoose_1.model)("User", userSchema);
