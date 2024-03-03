const BoardModel = require("../models/board.model");
const TaskModel = require("../models/task.model");
const UserModel = require("../models/user.model");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");

//This will create new board if user have't created a board 
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
      
      const user = await UserModel.findById(req.user._id);
      user.recentlyVisitedBoards?.push(newBoard._id)
      await user.save()
      
      return res.status(201).json(new ApiResponse(201, { newBoard }, "Board Added Successfully"));
    }
  } catch (error) {
    return res.status(500).json(new ApiError(500, [], "Unable create the new board at this moment"));
  }
};

//This will update the board, user can edit board name or add new member in the board
const updateBoard = async (req, res) => {
  const {id} = req.params;
  const {email, name} = req.body;
  if(!email && !name){
    return res.status(404).json(new ApiResponse(404, {}, "You can only add new user in the board or edit the board name, either name or user email is required"));
  }
  const board = await BoardModel.findById(id);
  if(!board){
    return res.status(404).json(new ApiResponse(404, {}, "Board not found"));
  }
  try {
    if(name){
      board.name = name;
      await board.save();
      return res.status(200).json(new ApiResponse(200, board, "Board name updated successfully"));
    }
    if(email){
      const user = await UserModel.findOne({"email":email});
      if(!user){
        return res.status(404).json(new ApiResponse(404, {}, "User not found with this email"));
      }
      user.recentlyVisitedBoards?.push(id);
      board.members?.push(user._id);
      await board.save();
      await user.save();
      return res.status(200).json(new ApiResponse(200, board, "Board new member updated successfully"));
    }
  } catch (error) {
    return res.status(500).json(new ApiError(500, [], "Unable to update board at this moment"));
  }
};

//This return the basic board details only
const getSingleBoard = async (req, res) => {
  const {id} = req.params;
  try {
    const board = await BoardModel.findById(id);
    if(!board){
      return res.status(404).json(new ApiError(404, [], "board not found"))
    }

    const tasks = await TaskModel.find({"board": id});
    return res.status(200).json(new ApiResponse(200, board, "board Details fetched"))
  } catch (error) {
    return res.status(500).json(new ApiError(500, [], "Unable to fetch the board at this moment"))
  }
};

//This will return all the board details including task details
const getFullBoardDetails = async (req, res)=>{
  const {id} = req.params;
  try {
    const board = await BoardModel.findById(id);
    if(!board){
      return res.status(404).json(new ApiError(404, [], "board not found"))
    }
    const tasks = await TaskModel.find({"board": id});

    const categorizedTasks = {
      "Unassigned": [],
      "In Development": [],
      "Pending Review": [],
      "Done": []
    };

    tasks.forEach(task => {
      categorizedTasks[task.category].push(task);
    });

    const user = await UserModel.findById(req.user._id);
    if(!user){
      return res.status(404).json(new ApiError(404, [], "User not found"))
    }

    user.recentlyVisitedBoards?.push(id);
    await user.save();
    return res.status(200).json(new ApiResponse(200, {board, categorizedTasks}, "Fetched all board details"));
  } catch (error) {
    return res.status(500).json(new ApiError(500, [], "Unable to fetch the board details at this moment"))
  }
}

module.exports = { addNewBoard, updateBoard, getSingleBoard, getFullBoardDetails };
