const BoardModel = require("../models/board.model");
const TaskModel = require("../models/task.model");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");

const addNewBoard = async (req, res) => {
  const { name } = req.body;
  const { _id } = req.user;
  if (!name) {
    return res.status(400).json(new ApiError(400, [], "Board name is required"));
  }
  try {
    const isAlreadyBoardCreated = await BoardModel.findOne({ createdBy: _id });
    if (isAlreadyBoardCreated) {
      return res.status(403).json(new ApiError(403,[],"You can't create anthor board, user can create only one board" ));
    }else{
      const board = {
        name,
        createdBy: _id,
        members: [_id],
      };

      const newBoard = await BoardModel.create(board);
      if (!newBoard) {
        return res.status(500).json( new ApiError(500,[],"Something went wrong while adding new newBoard"));
      }
      
      return res.status(201).json(new ApiResponse(201, { newBoard }, "Board Added Successfully"));
    }
  } catch (error) {
    return res.status(500).json(new ApiError(500, [], "Unable create the new board at this moment"));
  }
};

const updateBoard = async (req, res) => {
  try {
  } catch (error) {}
};

const getSingleBoard = async (req, res) => {
  const {id} = req.params;
  try {
    const board = await BoardModel.findById(id);
    if(!board){
      return res.status(404).json(new ApiError(404, [], "board not found"))
    }

    const tasks = await TaskModel.find({"board": id});
    return res.status(200).json(new ApiResponse(200, {board, tasks}, "board Details fetched"))
  } catch (error) {
    return res.status(500).json(new ApiError(500, [], "Unable to fetch the board details at this moment"))
  }
};

module.exports = { addNewBoard, updateBoard, getSingleBoard };
