"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allTemplates = void 0;
const enums_1 = require("../enums");
exports.allTemplates = {
    [enums_1.EEmailAction.WELCOME]: {
        subject: "Great to see you in out app!",
        templateName: "register",
    },
    [enums_1.EEmailAction.FORGOT_PASSWORD]: {
        subject: "FORGOT PASSWORD!",
        templateName: "forgotPassword",
    },
    [enums_1.EEmailAction.ACTIVATE]: {
        subject: "Activate account!",
        templateName: "activate",
    },
    [enums_1.EEmailAction.REMINDER]: {
        subject: "We miss you!",
        templateName: "reminder",
    },
};
