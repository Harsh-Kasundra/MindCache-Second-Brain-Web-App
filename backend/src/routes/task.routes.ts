import express from "express";
import * as taskController from "../controllers/task.controller";
import {isAuthenticated} from "../middleware/authMiddleware";
const router = express.Router();

router.get("/", isAuthenticated, taskController.getTasks);
router.post("/", isAuthenticated, taskController.createTask);
router.put("/:task_id", isAuthenticated, taskController.updateTask);
router.delete("/:task_id", isAuthenticated, taskController.deleteTask);
router.put("/:task_id", isAuthenticated, taskController.markDoneTask);

export default router;
