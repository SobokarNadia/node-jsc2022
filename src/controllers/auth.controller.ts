import { NextFunction, Request, Response } from "express";

import { authService } from "../services";
import { ITokenPair } from "../types";

class AuthController {
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await authService.register(req.body);

      const actionToken = await authService.activateUser(req.body.email);

      res.status(201).json(actionToken);
    } catch (e) {
      next(e);
    }
  }

  async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ITokenPair>> {
    try {
      const { email, password } = req.body;
      const { user } = res.locals;

      const tokenPair = await authService.login(
        {
          email,
          password,
        },
        user
      );

      return res.status(200).json(tokenPair);
    } catch (e) {
      next(e);
    }
  }

  async refresh(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ITokenPair>> {
    try {
      const { tokenInfo, jwtPayload } = res.locals;

      const tokenPair = await authService.refresh(tokenInfo, jwtPayload);

      return res.status(200).json(tokenPair);
    } catch (e) {
      next(e);
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { tokenInfo } = req.res.locals;
      const { oldPassword, newPassword } = req.body;

      await authService.changePassword(
        tokenInfo._user_id,
        oldPassword,
        newPassword
      );

      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = res.locals;

      const actionToken = await authService.forgotPassword(user);

      res.status(200).json(actionToken);
    } catch (e) {
      next(e);
    }
  }

  async setForgotPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const {
        tokenInfo: { _user_id },
      } = req.res.locals;

      const { newPassword } = req.body;

      await authService.setForgotPassword(_user_id, newPassword);

      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  async activate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { tokenInfo } = req.res.locals;

      await authService.setUserActivate(tokenInfo._user_id);

      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
