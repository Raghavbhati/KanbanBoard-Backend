const express = require("express");
const { addNewBoard, getSingleBoard, updateBoard } = require("../controllers/board.controller");

const boardRouter = express.Router();

boardRouter.post("/add", addNewBoard);
boardRouter.get("/:id", getSingleBoard);
boardRouter.patch("/:id", updateBoard);

module.exports = boardRouter;