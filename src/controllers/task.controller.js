const TaskModel = require("../models/task.model");
const UserModel = require("../models/user.model");
const {ApiError} = require("../utils/ApiError");
const {ApiResponse} = require("../utils/ApiResponse"); 

//Add new task in the board
const addNewTask = async(req, res)=>{
    const {title, description, category, deadline, boardID, assignedToUser}= req.body;
    if(!title){
       return res.status(400).json(new ApiError(400, [], "title is required"));
    }
    if(!description){
        return res.status(400).json(new ApiError(400, [], "description is required"));
    }
    if(!deadline){
        return res.status(400).json(new ApiError(400, [], "deadline is required"));
    }
    if(!boardID){
        return res.status(400).json(new ApiError(400, [], "board is required"));
    }
    if(!assignedToUser){
        return res.status(400).json(new ApiError(400, [], "assigned to user is required"));
    }


    try {
        const newTask = await TaskModel.create({
            title, 
            description, 
            category, 
            deadline,
            "board" : boardID,
            "assignedTo" : assignedToUser
        });
        if(!newTask){
            return res.status(400).json(new ApiError(400, [], "Something went wrong while adding new task"))
        }
        return res.status(201).json(new ApiResponse(201, {newTask}, "Task Added Successfully"))
    } catch (error) {
        return res.status(500).json(new ApiError(500, [], "Unable to add new task at this moment"));
    }
}

//this will return the single task details
const getSingleTask = async(req, res)=>{
    const {id} = req.params;
    if(!id){
        return res.status(400).json(new ApiError(400, [], "Task ID is required"))
    }
    try {
        const getTask = await TaskModel.findById( id);
        if(!getTask){
            return res.status(404).json(new ApiError(404, [], "Task not found"))
        }else{
            return res.status(200).json(new ApiResponse(200, {getTask}, "Single Task Fetched Successfully"))
        }
    } catch (error) {
        return res.status(500).json(new ApiError(500, [], "Unable to fetch the task at this moment"))
    }
}

//this will update the task deatils
const updateTask = async (req, res)=>{
    const {id} = req.params;
    const {title, description, category, deadline, email}= req.body;
    if(!id){
        return res.status(400).json(new ApiError(400, [], "Task ID is required"));
    }
    const task = await TaskModel.findById(id);
    if(!task){
         return res.status(404).json(new ApiError(404, [], "Task not found"));
    }
    try {
        if(email !== undefined){
            const user = await UserModel.findOne({"email":email});
            console.log(user)
            if(!user){
                return res.status(404).json(new ApiResponse(404, {}, "User not found with this email"));
            }

            task.assignedTo = user._id;
            const updatedTask= await task.save();
            if(!updatedTask){
                return  res.status(400).json(new ApiError(400, [], "Something went wrong while updating the task"))
            }
            
            return res.status(200).json(new ApiResponse(200, {updatedTask}, "Task assigned to new user scuessfully"))
        }
        if(!email){
            task.title = title || task.title;
            task.description = description || task.description;
            task.category = category || task.category;
            task.deadline = deadline || task.deadline;
    
    
            const updatedTask = await task.save();
            if(!updatedTask){
                return  res.status(400).json(new ApiError(400, [], "Something went wrong while updating the task"))
            }
            return res.status(200).json(new ApiResponse(200, {updatedTask}, "Task Updated"))
        }
    } catch (error) {
        return res.status(500).json(new ApiError(500, [], "Unable to update the task at this moment"))
    }
}
module.exports = {addNewTask, getSingleTask, updateTask}
