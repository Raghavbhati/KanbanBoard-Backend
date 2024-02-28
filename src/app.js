const express = require("express");

const app = express();

app.get("/", (req, res)=>{
    try {
        res.send("Server is live, Check API Docs")
    } catch (error) {
        res.send("Server down")
    }
})

module.exports = {app};