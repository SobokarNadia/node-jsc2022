import { passwordService } from "./password.service";
import { ICredentials, IPayload, ITokenPair, IUser } from "../types";
import { ActionToken, OldPassword, Token, User } from "../models";
import { ApiError } from "../errors";
import { tokenService } from "./token.service";
import { emailService } from "./email.service";
import { EActionTokenType, EEmailAction, EUserStatus } from "../enums";

class AuthService {
  async register(body: IUser) {
    try {
      const hashedPassword = await passwordService.hash(body.password);

      await User.create({
        ...body,
        password: hashedPassword,
      });

      await emailService.sendMail("sobokar.be@gmail.com", EEmailAction.WELCOME);
    } catch (e) {
      throw new ApiError(e.message, e.error);
    }
  }

  async login(loginData: ICredentials, user: IUser) {
    try {
      const isMatched = await passwordService.compare(
        loginData.password,
        user.password
      );

      if (!isMatched)
        throw new ApiError("Email or password is not valid!", 400);

      const tokenPair = tokenService.generateTokenPair({
        _id: user._id,
        name: user.name,
      });

      await Token.create({
        _user_id: user._id,
        ...tokenPair,
      });

      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  async refresh(
    tokenInfo: ITokenPair,
    jwtPayload: IPayload
  ): Promise<ITokenPair> {
    try {
      const tokenPair = tokenService.generateTokenPair({
        _id: jwtPayload._id,
        name: jwtPayload.name,
      });

      await Promise.all([
        Token.create({
          _user_id: jwtPayload._id,
          ...tokenPair,
        }),
        Token.deleteOne({ refreshToken: tokenInfo.refreshToken }),
      ]);

      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    try {
      const user = await User.findById(userId);

      const isMatch = await passwordService.compare(oldPassword, user.password);

      if (!isMatch) throw new ApiError("Password is not valid", 400);

      const newHashedPassword = await passwordService.hash(newPassword);
      await User.updateOne(
        { _id: user._id },
        {
          $set: {
            password: newHashedPassword,
          },
        }
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  async forgotPassword(user: IUser) {
    try {
      const actionToken = tokenService.generateActionToken(
        { _id: user._id },
        EActionTokenType.forgot
      );

      await ActionToken.create({
        _user_id: user._id,
        actionToken,
        actionType: EActionTokenType.forgot,
      });

      await emailService.sendMail(user.email, EEmailAction.FORGOT_PASSWORD, {
        token: actionToken,
      });

      await OldPassword.create({ _user_id: user._id, password: user.password });

      return actionToken;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  async setForgotPassword(userId: string, newPassword: string) {
    try {
      const newHashedPassword = await passwordService.hash(newPassword);

      await User.updateOne(
        { _id: userId },
        { $set: { password: newHashedPassword } }
      );

      await ActionToken.deleteMany({
        _user_id: userId,
        actionType: EActionTokenType.forgot,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  async activateUser(email: string): Promise<string> {
    try {
      const user: IUser = await User.findOne({ email: email });

      const actionToken = tokenService.generateActionToken(
        { _id: user._id },
        EActionTokenType.activate
      );

      await Promise.all([
        await ActionToken.create({
          _user_id: user._id,
          actionToken,
          actionType: EActionTokenType.activate,
        }),

        await emailService.sendMail(
          "sobokar.be@gmail.com",
          EEmailAction.ACTIVATE,
          {
            token: actionToken,
          }
        ),
      ]);

      return actionToken;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  async setUserActivate(userId: string): Promise<void> {
    try {
      await ActionToken.deleteMany({
        _user_id: userId,
        actionType: EActionTokenType.activate,
      });

      await User.updateOne(
        { _id: userId },
        { $set: { status: EUserStatus.active } }
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authService = new AuthService();
