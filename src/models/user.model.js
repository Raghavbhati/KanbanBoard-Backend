const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    "googleId" : {
        type : String,
        trim : true,
        required : true,
    },
    "name" : {
        type : String,
        trim : true,
    }, 
    "email" : {
        type : String,
        trim : true,
        required : true,
    },
    "avatar" : {
        type : String,
    }, 
    "recentlyVisitedBoards" : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Board',
    }]
}, {
    timestamps : true,
});


const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
