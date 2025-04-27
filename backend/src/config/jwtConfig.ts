import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface JwtPayloadWithId extends JwtPayload {
    user_id: string;
}

// Ensure JWT_SECRET is properly loaded
const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
}

// Generate token with 'user_id' to match verifyToken expectations
export const generateToken = (userId: string) => {
    return jwt.sign({ user_id: userId }, JWT_SECRET, { expiresIn: "1d" });
};

// Verify token and decode the 'user_id'
export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET) as JwtPayloadWithId;
};
