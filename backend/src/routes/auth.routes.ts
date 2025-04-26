import express from "express";
import * as authController from "../controllers/auth.controller";

const router = express.Router();

router.post("/signin", authController.signinUser);
router.post("/signup", authController.signupUser);
router.post("/logout", authController.logoutUser);

export default router;
