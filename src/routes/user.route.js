const express = require("express");
const passport = require("../utils/passport");
const userRouter = express.Router();

// userRouter.get("/google/success", (req, res) => {
//   try {
//   } catch (error) {}
// });

// userRouter.get("/google/failure", (req, res) => {});

userRouter.get('/google', 
  passport.authenticate('google', { scope:[ 'email', 'profile' ] }
));

userRouter.get("/google/callback",  
  passport.authenticate("google", {failureRedirect: "/login/failed",session:false}), 
  function(req, res){
    console.log(res)
    res.redirect('/');
  }
);


// app.get('/auth/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });

// userRouter.post("/logout", function (req, res, next) {
//   req.logout(function (err) {
//     if (err) {
//       return next(err);
//     }
//     res.redirect(process.env.CLIENT_URL);
//   });
// });

module.exports = userRouter;
