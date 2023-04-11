"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cronRunner = void 0;
const removeOldTokens_1 = require("./removeOldTokens");
const removeOldPasswords_1 = require("./removeOldPasswords");
const remindAbsentUser_1 = require("./remindAbsentUser");
const cronRunner = () => {
    removeOldTokens_1.removeOldTokens.start();
    removeOldPasswords_1.removeOldPassword.start();
    remindAbsentUser_1.remindAbsentUser.start();
};
exports.cronRunner = cronRunner;
