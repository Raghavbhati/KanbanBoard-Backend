const express = require("express");
const { addNewTask, getSingleTask, updateTask } = require("../controllers/task.controller");
const taskRouter = express.Router();

taskRouter.get("/");
taskRouter.post("/add", addNewTask);
taskRouter.get("/:id", getSingleTask);
taskRouter.patch("/:id", updateTask);


module.exports = taskRouter;