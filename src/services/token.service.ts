import * as jwt from "jsonwebtoken";

import { IActionPayload, IPayload, ITokenPair } from "../types";
import { configs } from "../configs";
import { ApiError } from "../errors";
import { EActionTokenType, ETokenType } from "../enums";

class TokenService {
  public generateTokenPair(payload: IPayload): ITokenPair {
    const accessToken = jwt.sign(payload, configs.ACCESS_SECRET, {
      expiresIn: configs.EXPIRESIN_ACCESS,
    });
    const refreshToken = jwt.sign(payload, configs.REFRESH_SECRET, {
      expiresIn: configs.EXPIRESIN_REFRESH,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  public checkToken(token: string, tokenType: ETokenType): IPayload {
    try {
      let secret = "";

      switch (tokenType) {
        case ETokenType.access:
          secret = configs.ACCESS_SECRET;
          break;
        case ETokenType.refresh:
          secret = configs.REFRESH_SECRET;
          break;
      }

      return jwt.verify(token, secret) as IPayload;
    } catch (e) {
      throw new ApiError("Token not valid!", 401);
    }
  }

  public generateActionToken(
    payload: IActionPayload,
    tokenType: EActionTokenType
  ): string {
    let secret = "";
    let expiresIn = "";

    switch (tokenType) {
      case EActionTokenType.activate:
        secret = configs.ACTION_ACTIVATE_SECRET;
        expiresIn = configs.EXPIRESIN_ACTIVATE;
        break;
      case EActionTokenType.forgot:
        secret = configs.ACTION_FORGOT_SECRET;
        expiresIn = configs.EXPIRESIN_FORGOT;
        break;
    }

    return jwt.sign(payload, secret, { expiresIn });
  }

  public checkActionToken(
    actionToken: string,
    tokenType: EActionTokenType
  ): IActionPayload {
    let secret = "";

    switch (tokenType) {
      case EActionTokenType.activate:
        secret = configs.ACTION_ACTIVATE_SECRET;
        break;
      case EActionTokenType.forgot:
        secret = configs.ACTION_FORGOT_SECRET;
        break;
    }
    return jwt.verify(actionToken, secret) as IActionPayload;
  }
}

export const tokenService = new TokenService();
