const express = require("express");
const passport = require("../utils/passport");
const { addUserInDB } = require("../controllers/user.controller");
const userRouter = express.Router();


// userRouter.get("/google/failed", (req, res) => {});

userRouter.get('/google', 
  passport.authenticate('google', { scope:[ 'email', 'profile' ] }
));

userRouter.get("/google/callback",  
  passport.authenticate("google", {failureRedirect: "/login/failed"}), 
  function(req, res){
    addUserInDB(req.user) 
    res.redirect('/');
  }
);
userRouter.post("/logout", function (req, res, next) {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(process.env.CLIENT_URL);
  });
});

module.exports = userRouter;
