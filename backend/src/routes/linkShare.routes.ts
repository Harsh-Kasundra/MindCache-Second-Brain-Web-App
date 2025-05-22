import express from "express";
import * as linkController from "../controllers/linkShare.controller";
import {isAuthenticated} from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", isAuthenticated, linkController.createLink);
router.delete("/", isAuthenticated, linkController.deleteLink);
router.get("/:shareLink", linkController.getLinkContent);

export default router;
