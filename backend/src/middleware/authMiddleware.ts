import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken"; // 👈 needed to check error type
import {verifyToken} from "../config/jwtConfig";

export const isAuthenticated = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // If using session-based auth
        if (req.session?.user) {
            req.userId = req.session.user.user_id;
            next();
            return;
        }

        // If using JWT
        const token = req.headers.authorization?.split(" ")[1];
        if (token) {
            try {
                const decoded = verifyToken(token);
                if (decoded && typeof decoded !== "string") {
                    req.userId = decoded.user_id;
                    next();
                    return;
                }
            } catch (err: any) {
                if (err instanceof jwt.TokenExpiredError) {
                    res.status(401).json({
                        success: false,
                        message: "JWT expired",
                    });
                }
                if (err instanceof jwt.JsonWebTokenError) {
                    res.status(401).json({
                        success: false,
                        message: "Invalid token",
                    });
                }
                res.status(401).json({success: false, message: "Unauthorized"});
            }
        }

        res.status(401).json({success: false, message: "Unauthorized"});
    } catch (error) {
        console.error("Auth middleware error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
