import { NextFunction, Request, Response } from "express";

import { IQuery, IUser } from "../types";
import { userService } from "../services";
import { UploadedFile } from "express-fileupload";
import { userMapper } from "../mappers";

class UserController {
  async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser[]>> {
    try {
      const response = await userService.getWithPagination(req.query as IQuery);

      return res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const { user } = res.locals;

      const response = userMapper.toResponse(user);

      return res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const { params, body } = req;

      const user = await userService.update(params.userId, body);

      const response = userMapper.toResponse(user);

      return res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  public async uploadAvatar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const user = res.locals.user as IUser;
      const avatar = req.files.avatar as UploadedFile;

      const newUser = await userService.uploadAvatar(avatar, user);
      console.log(newUser);
      const response = userMapper.toResponse(newUser);

      return res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  public async deleteAvatar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const user = res.locals.user as IUser;

      const newUser = await userService.deleteAvatar(user);
      console.log(newUser);
      const response = userMapper.toResponse(newUser);

      return res.status(200).json(response);
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
      const { userId } = req.params;
      await userService.delete(userId);

      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
