const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    "board": {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board',
        required: true,
    },
    "title": {
        type: String,
        required: true,
        trim: true,
    },
    "description": {
        type: String,
        trim: true,
    },
    "category": {
        type: String,
        enum: ["Unassigned", "In Development", "Pending Review", "Done"],
        default: "Unassigned",
    },
    "assignedTo": {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    "deadline": {
        type: Date,
    },
}, {
    timestamps: true,
});

const TaskModel = mongoose.model("Task", taskSchema);

module.exports = TaskModel;
