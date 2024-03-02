const express = require("express");
const { addNewBoard, getSingleBoard, updateBoard } = require("../controllers/board.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

const boardRouter = express.Router();

boardRouter.post("/add", authMiddleware, addNewBoard);
boardRouter.get("/:id",authMiddleware, getSingleBoard);
boardRouter.patch("/:id", updateBoard);

module.exports = boardRouter;   