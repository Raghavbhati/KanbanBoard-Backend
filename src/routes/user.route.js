const express = require("express");
const passport = require("../utils/passport");
const { addUserInDB } = require("../controllers/user.controller");
const userRouter = express.Router();

//For Login & Signup
userRouter.get('/google', 
  passport.authenticate('google', { scope:[ 'email', 'profile' ] }
));


//This is callback api for passport JS, 
//also that will check is user is already existed or not, 
//if not then it will add user in DB
userRouter.get("/google/callback",  
  passport.authenticate("google", {failureRedirect: "/login/failed"}), 
  async function(req, res){
    await addUserInDB(req.user, res) 
    res.redirect('/');
  }
);

//If callack request failed
userRouter.get("/google/failed", (req, res) => {
  return res.send("Your google sign/sign request rejected please try again later")
});

//For logout request
userRouter.post("/logout", function (req, res, next) {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(process.env.CLIENT_URL);
  });
});

module.exports = userRouter;
