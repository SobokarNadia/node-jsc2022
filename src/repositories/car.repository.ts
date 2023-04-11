import { Types } from "mongoose";

import { ICar } from "../types";
import { Car } from "../models";

//відповідає за запити в базу
class CarRepository {
  public async getByUserAndCar(userId: string, carId: string): Promise<ICar> {
    const result = await Car.aggregate([
      {
        $match: {
          _id: carId,
          user: new Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$user",
        },
      },
    ]);
    return result[0];
  }
}

export const carRepository = new CarRepository();
