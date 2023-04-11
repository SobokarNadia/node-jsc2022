// import { Token } from "../models";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { CronJob } from "cron";
// import { emailService } from "../services/email.service";
// import { EEmailAction } from "../enums";

dayjs.extend(utc);

const userReminder = async (): Promise<void> => {
  // const lastTenD = dayjs().utc().subtract(10, "days");
  // const tokens = await Token.find({ createdAt: { $lte: lastTenD } });
  // const ids = tokens.map(async (token): Promise<void> => {
  //   await User.findById(token._id);
  // });
  // Promise.all(
  //   users.map(
  //     async (user) =>
  //       await emailService.sendMail(
  //         "sobokar.be@gmail.com",
  //         EEmailAction.REMINDER,
  //         {
  //           name: user.name,
  //         }
  //       )
  //   )
  // );
};

export const remindAbsentUser = new CronJob("* * * * *", userReminder);
