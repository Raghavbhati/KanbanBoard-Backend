const express = require("express");
const { addNewBoard, getSingleBoard, updateBoard, getFullBoardDetails } = require("../controllers/board.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

const boardRouter = express.Router();

boardRouter.post("/add", authMiddleware, addNewBoard);
boardRouter.get("/:id",authMiddleware, getSingleBoard);
boardRouter.get("/allDetails/:id",authMiddleware, getFullBoardDetails);
boardRouter.patch("/:id", updateBoard);

module.exports = boardRouter;   