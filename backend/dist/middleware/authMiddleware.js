"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // 👈 needed to check error type
const jwtConfig_1 = require("../config/jwtConfig");
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        // If using session-based auth
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            req.userId = req.session.user.user_id;
            next();
            return;
        }
        // If using JWT
        const token = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
        if (token) {
            try {
                const decoded = (0, jwtConfig_1.verifyToken)(token);
                if (decoded && typeof decoded !== "string") {
                    req.userId = decoded.user_id;
                    next();
                    return;
                }
            }
            catch (err) {
                if (err instanceof jsonwebtoken_1.default.TokenExpiredError) {
                    res.status(401).json({
                        success: false,
                        message: "JWT expired",
                    });
                }
                if (err instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                    res.status(401).json({
                        success: false,
                        message: "Invalid token",
                    });
                }
                res.status(401).json({ success: false, message: "Unauthorized" });
            }
        }
        res.status(401).json({ success: false, message: "Unauthorized" });
    }
    catch (error) {
        console.error("Auth middleware error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});
exports.isAuthenticated = isAuthenticated;
