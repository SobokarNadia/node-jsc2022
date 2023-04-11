import { NextFunction, Request, Response } from "express";

import { ActionToken, OldPassword, Token } from "../models";
import { ApiError } from "../errors";
import { passwordService, tokenService } from "../services";
import { EActionTokenType, ETokenType } from "../enums";

class AuthMiddleware {
  async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const accessToken = req.get("Authorization");

      if (!accessToken) throw new ApiError("Access token is absent", 422);

      const jwtPayload = tokenService.checkToken(
        accessToken,
        ETokenType.access
      );

      const tokenInfo = await Token.findOne({ accessToken });

      if (!tokenInfo) throw new ApiError("Access token is not valid", 422);

      req.res.locals = { tokenInfo, jwtPayload };
      next();
    } catch (e) {
      next(e);
    }
  }

  async checkRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const refreshToken = req.get("Authorization");

      if (!refreshToken) throw new ApiError("Refresh token is absent", 422);

      const jwtPayload = await tokenService.checkToken(
        refreshToken,
        ETokenType.refresh
      );

      const tokenInfo = await Token.findOne({ refreshToken });

      if (!tokenInfo) throw new ApiError("Refresh token is not valid", 422);

      req.res.locals = { tokenInfo, jwtPayload };
      next();
    } catch (e) {
      next(e);
    }
  }

  public checkActionToken(actionType: EActionTokenType) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const actionToken = req.params.token;

        if (!actionToken) throw new ApiError("Action token is absent", 422);

        const jwtPayload = await tokenService.checkActionToken(
          actionToken,
          actionType
        );

        const tokenInfo = await ActionToken.findOne({ actionToken });

        if (!tokenInfo) throw new ApiError("Action token is not valid", 422);

        req.res.locals = { tokenInfo, jwtPayload };
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  async checkOldPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const {
        tokenInfo: { _user_id },
      } = req.res.locals;
      const { newPassword } = req.body;

      const oldPasswords = await OldPassword.find({ _user_id });

      if (oldPasswords.length === 0) return next();

      await Promise.all(
        oldPasswords.map(async (record) => {
          const isMatch = await passwordService.compare(
            newPassword,
            record.password
          );

          if (isMatch) {
            throw new ApiError("You should enter totally new password!", 409);
          }
        })
      );

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
