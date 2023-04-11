import { model, Schema } from "mongoose";

import { EGnders, EUserStatus } from "../enums";

const userSchema = new Schema({
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
    enum: EGnders,
  },
  status: {
    type: String,
    enum: EUserStatus,
    default: EUserStatus.inactive,
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
  async findByName(name: string): Promise<void> {
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

export const User = model("User", userSchema);
