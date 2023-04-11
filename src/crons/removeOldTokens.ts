import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { Token } from "../models";

dayjs.extend(utc);

const tokensRemover = async (): Promise<void> => {
  const prevMonth = dayjs().utc().subtract(1, "month");

  await Token.deleteMany({ createAt: { $lte: prevMonth } });
};

export const removeOldTokens = new CronJob("0 0 * * * ", tokensRemover);
