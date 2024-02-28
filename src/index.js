require("dotenv").config({path:"./.env"});
const {dbConnection} = require("./config/db");
const {app} = require("./app");


const PORT = `${process.env.PORT}` || 9000;

dbConnection()
.then(()=>{
    app.listen(PORT, ()=>{
        console.log("Server is live on Port", PORT)
    })
})
.catch((error)=>{
    console.log("Unable to connect with server");
})