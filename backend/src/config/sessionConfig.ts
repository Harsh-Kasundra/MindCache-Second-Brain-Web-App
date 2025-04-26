import session from "express-session";
import dotenv from "dotenv";

dotenv.config();

export default session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "development",
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
});
