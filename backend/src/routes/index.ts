import express from "express";
import authRouter from "./auth.routes";
import linkShareRouter from "./linkShare.routes";
import contentRouter from "./content.routes";
import taskRouter from "./task.routes";

const router = express.Router();

router.use("/auth", authRouter); //✅
router.use("/share", linkShareRouter); //✅
router.use("/content", contentRouter); //✅
router.use("/task", taskRouter); //✅

export default router;
