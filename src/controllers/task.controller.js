const TaskModel = require("../models/task.model");
const {ApiError} = require("../utils/ApiError");
const {ApiResponse} = require("../utils/ApiResponse"); 

const addNewTask = async(req, res)=>{
    const {title, description, category, deadline}= req.body;
    if(!title){
        res.status(400).json(new ApiError(400, [], "title is required"));
    }
    if(!description){
        res.status(400).json(new ApiError(400, [], "description is required"));
    }
    if(!deadline){
        res.status(400).json(new ApiError(400, [], "deadline is required"));
    }

    try {
        const newTask = await TaskModel.create({title, description, category, deadline});
        if(!newTask){
            res.status(400).json(new ApiError(400, [], "Something went wrong while adding new task"))
        }else{
            res.status(201).json(new ApiResponse(201, {newTask}, "Task Added Successfully"))
        }
    } catch (error) {
        res.status(500).json(new ApiError(500, [], "Unable to add new task at this moment"));
    }
}

const getSingleTask = async(req, res)=>{
    const {id} = req.params;
    if(!id){
        res.status(400).json(new ApiError(400, [], "Task ID is required"))
    }
    try {
        const getTask = await TaskModel.findById( id);
        if(!getTask){
            res.status(404).json(new ApiError(404, [], "Task not found"))
        }else{
            res.status(200).json(new ApiResponse(200, {getTask}, "Single Task Fetched Successfully"))
        }
    } catch (error) {
        res.status(500).json(new ApiError(500, [], "Unable to fetch the task at this moment"))
    }
}

const updateTask = async (req, res)=>{
    const {id} = req.params;
    const {title, description, category, deadline}= req.body;

    if(!id){
        res.status(400).json(new ApiError(400, [], "Task ID is required"));
    }
    try {
        const task = await TaskModel.findById(id);
        if(!task){
            res.status(404).json(new ApiError(404, [], "Task not found"));
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.category = category || task.category;
        task.deadline = deadline || task.deadline;

        const updatedTask = await task.save();
        if(!updatedTask){
            res.status(400).json(new ApiError(400, [], "Something went wrong while updating the task"))
        }
        res.status(200).json(new ApiResponse(200, {updatedTask}, "Task Updated"))
    } catch (error) {
        res.status(500).json(new ApiError(500, [], "Unable to update the task at this moment"))
    }
}
module.exports = {addNewTask, getSingleTask, updateTask}
