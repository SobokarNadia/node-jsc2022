import { NextFunction, Request, Response } from "express";

import { Car } from "../models";
import { ICar, IPayload, IResponse } from "../types";
import { carService } from "../services";

class CarController {
  async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICar>> {
    try {
      const { car } = res.locals;

      return res.status(200).json(car);
    } catch (e) {
      next(e);
    }
  }

  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IResponse<ICar>>> {
    try {
      const { _id } = req.res.locals as IPayload;
      const car = await carService.create(req.body, _id);

      return res.json(car);
    } catch (e) {
      next(e);
    }
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICar>> {
    try {
      const { carId } = req.params;

      const car = await Car.findByIdAndUpdate(
        carId,
        { ...req.body },
        { new: true }
      );

      return res.status(200).json(car);
    } catch (e) {
      next(e);
    }
  }
  async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> {
    try {
      const { carId } = req.params;
      await Car.deleteOne({ _id: carId });

      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const carController = new CarController();
