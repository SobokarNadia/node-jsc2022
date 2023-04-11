import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { CronJob } from "cron";

import { OldPassword } from "../models";

dayjs.extend(utc);

const passwordRemover = async (): Promise<void> => {
  const prevYear = dayjs().utc().subtract(1, "year");

  await OldPassword.deleteMany({ createAt: { $lte: prevYear } });
};

export const removeOldPassword = new CronJob("0 0 * * *", passwordRemover);
