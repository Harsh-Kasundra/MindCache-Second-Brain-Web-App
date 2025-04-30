import express from "express";
import * as tagController from "../controllers/tag.controller";
import { isAuthenticated } from "../middleware/authMiddleware";
const router = express.Router();

router.get("/", isAuthenticated, tagController.getTags);
router.post("/", isAuthenticated, tagController.createTag);
router.put("/:tag_id", isAuthenticated, tagController.updateTag);
router.delete("/:tag_id", isAuthenticated, tagController.deleteTag);

export default router;
