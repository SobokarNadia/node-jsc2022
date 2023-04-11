import { ESmsAction } from "../enums";

export const smsTemplates: { [key: string]: string } = {
  [ESmsAction.WELCOME]: "Greate to see you in our app!",
  [ESmsAction.FORGOT_PASSWORD]:
    "If you forgot your password, follow next steps!",
};
