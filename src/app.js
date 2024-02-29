const express = require("express");
const passport = require("passport");
const session = require("express-session");
const { userRoute } = require("./routes/user.route");
const app = express();
const passpostStrategy = require("./utils/passport")

app.use(session({
    secret: 'RAGHAV',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    try {
        res.send("Server is live, Check API Docs");
    } catch (error) {
        res.send("Server down");
    }
});

app.use("/auth", userRoute);

module.exports = { app };
