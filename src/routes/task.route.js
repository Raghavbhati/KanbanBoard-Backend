const express = require("express");
const { addNewTask, getSingleTask, updateTask } = require("../controllers/task.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const taskRouter = express.Router();

taskRouter.get("/");
taskRouter.post("/add",authMiddleware, addNewTask);
taskRouter.get("/:id", getSingleTask);
taskRouter.patch("/:id", updateTask);


module.exports = taskRouter;