import { removeOldTokens } from "./removeOldTokens";
import { removeOldPassword } from "./removeOldPasswords";
import { remindAbsentUser } from "./remindAbsentUser";

export const cronRunner = () => {
  removeOldTokens.start();
  removeOldPassword.start();
  remindAbsentUser.start();
};
