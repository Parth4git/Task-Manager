import express from "express";

const router = express.Router();

import {
  getTasks,
  getTask,
  postTask,
  putTask,
  deleteTask
} from "../controllers/taskController.js";
import {
  verifyAccessToken
} from "../middlewares/index.js";

// Routes beginning with /api/tasks
router.get("/", getTasks);
router.get("/:taskId", verifyAccessToken, getTask);
router.post("/",  postTask);
router.put("/:id",  putTask);
router.delete("/:taskId",  deleteTask);

export default router;