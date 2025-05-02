import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { createUserSchema } from "../validations/validation";
import { comparePassword, hashPassword } from "../utils/passwordUtils";
import { generateToken } from "../config/jwtConfig";
import { validateRequest } from "../utils/validateRequest";

const prisma = new PrismaClient();

/**
 * @route POST /api/v1/auth/signup
 * @desc signup user
 * @access public
 */

export const signupUser = async (req: Request, res: Response): Promise<any> => {
    //validating the input data from frontend
    const validatedData = validateRequest(createUserSchema, req, res);
    if (!validatedData) return;
    const { username, user_email, password } = validatedData;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: { user_email },
    });
    if (existingUser) {
        return res
            .status(403)
            .json({ success: false, message: "Email already in use" });
    }

    try {
        //hashing the password
        const hashedPassword = await hashPassword(password);

        //Creating an user and entering data in table
        const newUser = await prisma.user.create({
            data: {
                username: username,
                user_email: user_email,
                password: hashedPassword,
            },
        });

        /// Automatically log in the user after registration
        const token = generateToken(newUser.user_id);

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
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred during Signup",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};

/**
 * @route POST /api/v1/auth/signin
 * @desc Login user with JWT and session
 * @access public
 */
export const signinUser = async (req: Request, res: Response): Promise<any> => {
    const user_email = req.body.user_email?.trim();
    const password = req.body.password?.trim();

    if (!user_email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required",
        });
    }

    try {
        // Check if user exists and has a password
        const user = await prisma.user.findUnique({
            where: { user_email },
        });

        if (!user) {
            return res
                .status(401)
                .json({ success: false, message: "Invalid credentials" });
        }

        // Validate password
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res
                .status(401)
                .json({ success: false, message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = generateToken(user.user_id);
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
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred during login",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};

/**
 * @route POST /api/v1/auth/logout
 * @desc Logout user by deleting session
 * @access public
 */

export const logoutUser = async (req: Request, res: Response): Promise<any> => {
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
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred during logout",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
