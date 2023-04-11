import { NextFunction, Request, Response } from "express";

import { User } from "../models";
import { ApiError } from "../errors";

class CarMiddleware {
  async checkExistence(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { carId } = req.params;

      const car = await User.findById(carId);

      if (!car) {
        throw new ApiError("Car not found", 422);
      }

      res.locals.car = car;
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const carMiddleware = new CarMiddleware();
