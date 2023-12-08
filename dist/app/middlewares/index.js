"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewares = void 0;
const HTTPRequestLogger_1 = require("./HTTPRequestLogger");
const HTTPResponseLogger_1 = require("./HTTPResponseLogger");
const middlewares = [HTTPRequestLogger_1.HTTPRequestLogger, HTTPResponseLogger_1.HTTPResponseLogger];
exports.middlewares = middlewares;
//# sourceMappingURL=index.js.map