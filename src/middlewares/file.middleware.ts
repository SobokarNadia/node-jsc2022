import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { avatarConfigs } from "../configs";

class FileMiddleware {
  public async isFileValid(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.files) throw new ApiError("File is absent", 400);

      if (Array.isArray(req.files.avatar))
        throw new ApiError("You can upload only one photo", 400);

      const { size, mimetype } = req.files.avatar;

      if (size <= avatarConfigs.MAX_SIZE)
        throw new ApiError("Your avatart is too big", 400);

      if (!avatarConfigs.MIMETYPES.includes(mimetype))
        throw new ApiError(
          "Only jpeg/png/gif are allowed. Chose" + " another file please",
          400
        );

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const fileMiddleware = new FileMiddleware();
