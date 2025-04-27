import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sessionConfig from "./config/sessionConfig";
import cookieParser from "cookie-parser";

import rootRouter from "./routes/index";

dotenv.config;
const app = express();
const PORT = process.env.PORT || 3001;

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());
app.use(sessionConfig);

app.use("/api/v1", rootRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
