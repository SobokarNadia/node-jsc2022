import { Types } from "mongoose";

import { ICar } from "../types";
import { ApiError } from "../errors";
import { Car } from "../models";
import { carRepository } from "../repositories/car.repository";

class CarService {
  public async create(data: ICar, userId: string): Promise<any> {
    try {
      return Car.create({ ...data, user: new Types.ObjectId(userId) });
    } catch (e) {
      throw new ApiError(e.message, e.error);
    }
  }

  public async getById(userId: string, carId: string): Promise<ICar> {
    try {
      return carRepository.getByUserAndCar(userId, carId);
    } catch (e) {
      throw new ApiError(e.message, e.error);
    }
  }
}

export const carService = new CarService();
