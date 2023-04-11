import { Schema, model, Types } from "mongoose";

import { User } from "./User.model";

const oldPasswordSchema = new Schema(
  {
    _user_id: {
      type: Types.ObjectId,
      required: true,
      ref: User,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const OldPassword = model("oldPasswords", oldPasswordSchema);
