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
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.signinUser = exports.signupUser = void 0;
const client_1 = require("@prisma/client");
const validation_1 = require("../validations/validation");
const passwordUtils_1 = require("../utils/passwordUtils");
const jwtConfig_1 = require("../config/jwtConfig");
const validateRequest_1 = require("../utils/validateRequest");
const prisma = new client_1.PrismaClient();
/**
 * @route POST /api/v1/auth/signup
 * @desc signup user
 * @access public
 */
const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //validating the input data from frontend
    const validatedData = (0, validateRequest_1.validateRequest)(validation_1.createUserSchema, req, res);
    if (!validatedData)
        return;
    const { username, user_email, password } = validatedData;
    // Check if user already exists
    const existingUser = yield prisma.user.findUnique({
        where: { user_email },
    });
    if (existingUser) {
        return res
            .status(403)
            .json({ success: false, message: "Email already in use" });
    }
    try {
        //hashing the password
        const hashedPassword = yield (0, passwordUtils_1.hashPassword)(password);
        //Creating an user and entering data in table
        const newUser = yield prisma.user.create({
            data: {
                username: username,
                user_email: user_email,
                password: hashedPassword,
            },
        });
        /// Automatically log in the user after registration
        const token = (0, jwtConfig_1.generateToken)(newUser.user_id);
        // Store in session
        req.session.user = {
            user_id: newUser.user_id,
            user_email: newUser.user_email,
            username: newUser.username,
        };
        return res.status(201).json({
            success: true,
            message: "Admin registered successfully and logged in",
            token,
            user: newUser,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred during Signup",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.signupUser = signupUser;
/**
 * @route POST /api/v1/auth/signin
 * @desc Login user with JWT and session
 * @access public
 */
const signinUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const user_email = (_a = req.body.user_email) === null || _a === void 0 ? void 0 : _a.trim();
    const password = (_b = req.body.password) === null || _b === void 0 ? void 0 : _b.trim();
    if (!user_email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required",
        });
    }
    try {
        // Check if user exists and has a password
        const user = yield prisma.user.findUnique({
            where: { user_email },
        });
        if (!user) {
            return res
                .status(401)
                .json({ success: false, message: "Invalid credentials" });
        }
        // Validate password
        const isMatch = yield (0, passwordUtils_1.comparePassword)(password, user.password);
        if (!isMatch) {
            return res
                .status(401)
                .json({ success: false, message: "Invalid credentials" });
        }
        // Generate JWT token
        const token = (0, jwtConfig_1.generateToken)(user.user_id);
        req.session.user = {
            user_id: user.user_id,
            user_email: user.user_email,
            username: user.username,
        };
        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: req.session.user,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred during login",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.signinUser = signinUser;
/**
 * @route POST /api/v1/auth/logout
 * @desc Logout user by deleting session
 * @access public
 */
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.session.user) {
            return res.status(400).json({
                success: false,
                message: "User is not logged in",
            });
        }
        // Destroy session
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Failed to log out",
                    error: err.message,
                });
            }
            res.status(200).json({
                success: true,
                message: "Logout successful",
            });
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred during logout",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.logoutUser = logoutUser;
