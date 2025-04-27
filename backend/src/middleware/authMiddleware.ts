import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../config/jwtConfig";

export const isAuthenticated = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (req.session?.user) {
            req.userId = req.session.user.user_id;
            next();
            return;
        }

        const token = req.headers.authorization?.split(" ")[1];
        if (token) {
            const decoded = verifyToken(token);
            if (decoded) {
                req.userId = decoded.user_id;
                next();
                return;
            }
        }

        res.status(401).json({ success: false, message: "Unauthorized" });
    } catch (error) {
        console.error("Auth middleware error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
