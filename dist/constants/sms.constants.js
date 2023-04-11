"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.smsTemplates = void 0;
const enums_1 = require("../enums");
exports.smsTemplates = {
    [enums_1.ESmsAction.WELCOME]: "Greate to see you in our app!",
    [enums_1.ESmsAction.FORGOT_PASSWORD]: "If you forgot your password, follow next steps!",
};
