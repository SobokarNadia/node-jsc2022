"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regexConstants = void 0;
exports.regexConstants = {
    EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
};
