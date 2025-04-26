import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface JwtPayloadWithId extends JwtPayload {
    user_id: string;
}

const JWT_SECRET = process.env.JWT_SECRET!;

export const generateToken = (userId: string) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1d" });
};

export const verifyToken = (token: string) => {
    return jwt.verify(
        token as string,
        process.env.SECRET as string
    ) as JwtPayloadWithId;
};
