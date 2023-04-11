import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";
import { ObjectSchema } from "joi";

import { ApiError } from "../errors";

class CommonMiddleware {
  isUserIdValid(idField: string, from: "params" | "query" = "params") {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!isObjectIdOrHexString(req[from][idField]))
          throw new ApiError("User id is not valid!", 400);

        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public isBodyValid(validator: ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { error, value } = validator.validate(req.body);

        if (error) throw new ApiError(error.message, 400);

        req.body = value;
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const commonMiddleware = new CommonMiddleware();
