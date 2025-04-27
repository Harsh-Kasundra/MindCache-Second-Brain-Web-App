import express from "express";
import authRouter from "./auth.routes";
import linkShareRouter from "./linkShare.routes";
import contentRouter from "./content.routes";

const router = express.Router();

router.use("/auth", authRouter); //✅
router.use("/share", linkShareRouter); //✅
router.use("/content", contentRouter); //✅

export default router;
