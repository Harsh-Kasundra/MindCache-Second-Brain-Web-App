import express from "express";
import * as contentController from "../controllers/content.controller";
import { isAuthenticated } from "../middleware/authMiddleware";
const router = express.Router();

router.post("/", isAuthenticated, contentController.createContent);
router.get("/", isAuthenticated, contentController.getContent);
router.put("/:id", isAuthenticated, contentController.updateContent);
router.delete("/:id", isAuthenticated, contentController.deleteContent);
export default router;
