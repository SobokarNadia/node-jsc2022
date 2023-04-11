"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeOldPassword = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const cron_1 = require("cron");
const models_1 = require("../models");
dayjs_1.default.extend(utc_1.default);
const passwordRemover = async () => {
    const prevYear = (0, dayjs_1.default)().utc().subtract(1, "year");
    await models_1.OldPassword.deleteMany({ createAt: { $lte: prevYear } });
};
exports.removeOldPassword = new cron_1.CronJob("0 0 * * *", passwordRemover);
