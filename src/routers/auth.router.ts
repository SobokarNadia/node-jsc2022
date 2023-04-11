import { Router } from "express";

import { authController } from "../controllers";
import { UserValidator } from "../validators";
import {
  authMiddleware,
  commonMiddleware,
  userMiddleware,
} from "../middlewares";
import { EActionTokenType } from "../enums";

const router = Router();

router.post(
  "/register",
  commonMiddleware.isBodyValid(UserValidator.createUser),
  userMiddleware.getDynamicallyAndThrow("email"),
  authController.register
);

router.post(
  "/login",
  commonMiddleware.isBodyValid(UserValidator.loginUser),
  userMiddleware.getDynamicallyOrThrow("email"),
  authController.login
);

router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh
);

router.post(
  "/password/change",
  commonMiddleware.isBodyValid(UserValidator.changePassword),
  authMiddleware.checkAccessToken,
  authController.changePassword
);

router.post(
  "/password/forgot",
  commonMiddleware.isBodyValid(UserValidator.emailUser),
  userMiddleware.getDynamicallyOrThrow("email"),
  authController.forgotPassword
);

router.put(
  "/password/forgot/:token",
  commonMiddleware.isBodyValid(UserValidator.newPassword),
  authMiddleware.checkActionToken(EActionTokenType.forgot),
  authMiddleware.checkOldPassword,
  authController.setForgotPassword
);

router.post(
  "/activate/:token",
  authMiddleware.checkActionToken(EActionTokenType.activate),
  authController.activate
);

export const authRouter = router;
