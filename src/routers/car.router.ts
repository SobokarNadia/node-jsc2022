import { Router } from "express";

import { carController } from "../controllers";
import {
  authMiddleware,
  commonMiddleware,
  carMiddleware,
} from "../middlewares";
import { CarValidator } from "../validators";

const router = Router();

router.get(
  "/:userId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isUserIdValid("carId"),
  carMiddleware.checkExistence,
  carController.getById
);
router.post(
  "/:",
  authMiddleware.checkAccessToken,
  commonMiddleware.isUserIdValid("carId"),
  carController.create
);
router.put(
  "/:userId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isUserIdValid("userId"),
  commonMiddleware.isBodyValid(CarValidator.updateUser),
  carMiddleware.checkExistence,
  carController.update
);
router.delete(
  "/:userId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isUserIdValid("userId"),
  carMiddleware.checkExistence,
  carController.delete
);

export const carRouter = router;
