import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../config/jwtConfig";

export const isAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // 1. Check session first
    if (req.session && req.session.user) {
        next();
        return; // optional for clarity
    }

    // 2. If no session, check JWT
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
        const decoded = verifyToken(token);
        if (decoded) {
            req.userId = decoded.user_id;
            next();
            return; // optional for clarity
        }
    }

    // 3. If neither session nor JWT valid
    res.status(401).json({ success: false, message: "Unauthorized" });
};
