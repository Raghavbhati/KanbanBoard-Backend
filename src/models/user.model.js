const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")

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

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id : this._id,
        email : this.email
    },process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXP});
}


const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
