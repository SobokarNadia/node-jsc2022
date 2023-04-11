import * as Joi from "joi";

import { EGnders } from "../enums";
import { regexConstants } from "../constants";

export class UserValidator {
  private static firstname = Joi.string().min(2).max(50).trim();
  private static email = Joi.string()
    .regex(regexConstants.EMAIL)
    .lowercase()
    .trim();
  private static password = Joi.string().regex(regexConstants.PASSWORD);
  private static gender = Joi.valid(...Object.values(EGnders));

  static createUser = Joi.object({
    name: this.firstname.required(),
    email: this.email.required(),
    password: this.password.required(),
    gender: this.gender.required(),
  });

  static updateUser = Joi.object({
    name: this.firstname,
    gender: this.gender,
  });

  static loginUser = Joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });

  static changePassword = Joi.object({
    oldPassword: this.password.required(),
    newPassword: this.password.required(),
  });

  static emailUser = Joi.object({
    email: this.email.required(),
  });

  static newPassword = Joi.object({
    newPassword: this.password.required(),
  });
}
