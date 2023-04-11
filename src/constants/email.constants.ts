import { EEmailAction } from "../enums";

export const allTemplates: {
  [key: string]: {
    subject: string;
    templateName: string;
  };
} = {
  [EEmailAction.WELCOME]: {
    subject: "Great to see you in out app!",
    templateName: "register",
  },
  [EEmailAction.FORGOT_PASSWORD]: {
    subject: "FORGOT PASSWORD!",
    templateName: "forgotPassword",
  },
  [EEmailAction.ACTIVATE]: {
    subject: "Activate account!",
    templateName: "activate",
  },
  [EEmailAction.REMINDER]: {
    subject: "We miss you!",
    templateName: "reminder",
  },
};
