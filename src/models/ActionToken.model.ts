import { Schema, model, Types } from "mongoose";

import { User } from "./User.model";
import { EActionTokenType } from "../enums";

const actionTokenSchema = new Schema(
  {
    _user_id: {
      type: Types.ObjectId,
      required: true,
      ref: User,
    },
    actionToken: {
      type: String,
      required: true,
    },
    actionType: {
      type: String,
      enum: EActionTokenType,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamp: true,
  }
);

export const ActionToken = model("ActionToken", actionTokenSchema);
