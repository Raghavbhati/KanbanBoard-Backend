const express = require("express");
const passport = require("../utils/passport");
const { addUserInDB } = require("../controllers/user.controller");
const userRouter = express.Router();


userRouter.get('/google', 
  passport.authenticate('google', { scope:[ 'email', 'profile' ] }
));

userRouter.get("/google/callback",  
  passport.authenticate("google", {failureRedirect: "/login/failed"}), 
  async function(req, res){
    await addUserInDB(req.user, res) 
    res.redirect('/');
  }
);

userRouter.get("/google/failed", (req, res) => {
  return res.send("Your google sign/sign request rejected please try again later")
});

userRouter.post("/logout", function (req, res, next) {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(process.env.CLIENT_URL);
  });
});

module.exports = userRouter;
