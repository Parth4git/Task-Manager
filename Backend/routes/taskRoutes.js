import express from "express";

import {
  getTask,
  createTask,
  updateTask,
  deleteTask
} from "../controllers/task.controller.js";

import { authenticate } from "../middlewares/authorize.js";

const router = express.Router();

// Routes beginning with /api/tasks
router.post("/", authenticate, createTask);
router.get("/", authenticate, getTask);
router.put("/:id", authenticate, updateTask);
router.delete("/:id", authenticate, deleteTask);

export default router;