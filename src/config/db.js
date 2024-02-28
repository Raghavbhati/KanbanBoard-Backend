const mongoose = require("mongoose");

const dbConnection = async ()=>{
    try {
        const connection = await mongoose.connect(`${process.env.MONGO_URI}/kanbanboard`);
        console.log("Connected with the Database :", connection.connection.host)
    } catch (error) {
        console.log("Unable to connect with MongoDB", error)
    }
}

module.exports = {dbConnection};