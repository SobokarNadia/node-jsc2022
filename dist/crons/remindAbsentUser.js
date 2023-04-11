"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remindAbsentUser = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const cron_1 = require("cron");
dayjs_1.default.extend(utc_1.default);
const userReminder = async () => {
};
exports.remindAbsentUser = new cron_1.CronJob("* * * * *", userReminder);
