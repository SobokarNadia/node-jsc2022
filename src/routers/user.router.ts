import { Router } from "express";

import { userController } from "../controllers";
import {
  authMiddleware,
  commonMiddleware,
  fileMiddleware,
  userMiddleware,
} from "../middlewares";
import { UserValidator } from "../validators";

const router = Router();

router.get("/", userController.getAll);

router.get(
  "/:userId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isUserIdValid("userId"),
  userMiddleware.checkExistence,
  userController.getById
);

router.put(
  "/:userId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isUserIdValid("userId"),
  commonMiddleware.isBodyValid(UserValidator.updateUser),
  userMiddleware.checkExistence,
  userController.update
);

router.delete(
  "/:userId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isUserIdValid("userId"),
  userMiddleware.checkExistence,
  userController.delete
);

router.put(
  "/:userId/avatar",
  authMiddleware.checkAccessToken,
  userMiddleware.checkExistence,
  fileMiddleware.isFileValid,
  commonMiddleware.isUserIdValid("userId"),
  userController.uploadAvatar
);

router.delete(
  "/:userId/avatar",
  authMiddleware.checkAccessToken,
  userMiddleware.checkExistence,
  userController.deleteAvatar
);

export const userRouter = router;
