import { NextFunction, Request, Response } from "express";

import { User } from "../models";
import { ApiError } from "../errors";
import { IUser } from "../types";

class UserMiddleware {
  async checkExistence(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.params.userId;
      // const { _id } = req.res.locals.jwtPayload;
      // console.log(userId);
      const user = await User.findById(userId);

      if (!user) {
        throw new ApiError("User not found", 422);
      }

      res.locals = { user };
      next();
    } catch (e) {
      next(e);
    }
  }

  getDynamicallyAndThrow(
    fieldName: string,
    from: "body" | "query" | "params" = "body",
    dbField: keyof IUser = "email"
  ) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const fieldValue = req[from][fieldName];
        const user = await User.findOne({ [dbField]: fieldValue });

        if (user)
          throw new ApiError(
            `User with such ${fieldName} - ${fieldValue} already exists!`,
            409
          );

        next();
      } catch (e) {
        next(e);
      }
    };
  }

  getDynamicallyOrThrow(
    fieldName: string,
    from: "body" | "query" | "params" = "body",
    dbField: keyof IUser = "email"
  ) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const fieldValue = req[from][fieldName];
        const user = await User.findOne({ [dbField]: fieldValue });

        if (!user)
          throw new ApiError("User with such credentials does not exist!", 404);
        res.locals = { user };

        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const userMiddleware = new UserMiddleware();
