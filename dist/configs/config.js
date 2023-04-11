"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.configs = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    ACTION_ACTIVATE_SECRET: process.env.ACTION_ACTIVATE_SECRET,
    ACTION_FORGOT_SECRET: process.env.ACTION_FORGOT_SECRET,
    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD,
    EXPIRESIN_FORGOT: "7d",
    EXPIRESIN_ACTIVATE: "1d",
    EXPIRESIN_ACCESS: "15m",
    EXPIRESIN_REFRESH: "30d",
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    AWS_SECRET_KET: process.env.AWS_SECRET_KET,
    AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
    AWS_S3_BUCKET_REGION: process.env.AWS_S3_BUCKET_REGION,
    AWS_S3_BUCKET_URL: process.env.AWS_S3_BUCKET_URL,
    AWS_S3_BUCKET_ACL: process.env.AWS_S3_BUCKET_ACL,
};