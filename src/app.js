const express = require("express");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit")

const passpostStrategy = require("./utils/passport");
const userRouter = require("./routes/user.route");
const taskRouter = require("./routes/task.route");
const boardRouter = require("./routes/board.route");

const app = express();
app.use(express.json())
app.use(cookieParser())

const SESSION_SECRET = "RAGHAV";
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 500
});    
app.use(limiter);
app.use(passport.initialize());
app.use(passport.session());


app.get("/api/", (req, res) => {
    try {
        res.send("Server is live, Check API Docs");
    } catch (error) {
        res.send("Server down");
    }
});
app.use("/api/auth", userRouter);
app.use("/api/board", boardRouter)
app.use("/api/task", taskRouter)

module.exports = { app };
