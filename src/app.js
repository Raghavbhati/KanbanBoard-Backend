const express = require("express");
const passport = require("passport");
const session = require("express-session");

const passpostStrategy = require("./utils/passport");
const userRouter = require("./routes/user.route");
const taskRouter = require("./routes/task.route");
const boardRouter = require("./routes/board.route");

const app = express();
app.use(express.json())

// app.use(session({
//     secret: process.env.SESSION_SECRECT,
//     resave: false,
//     saveUninitialized: true
// }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    try {
        res.send("Server is live, Check API Docs");
    } catch (error) {
        res.send("Server down");
    }
});
app.use("/auth", userRouter);
app.use("/board", boardRouter)
app.use("/task", taskRouter)

module.exports = { app };
