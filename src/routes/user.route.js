const express = require("express");
const passport = require("passport");
const userRoute = express.Router();

userRoute.get("/google/success", (req, res) => {
  try {
  } catch (error) {}
});

userRoute.get("/google/failure", (req, res) => {});

userRoute.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);
// userRoute.get("/logout", function (req, res) {
//   console.log(req);
//   console.log("logged out!");
//   req.logout();
//   res.redirect(process.env.CLIENT_URL);
// });

userRoute.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(process.env.CLIENT_URL);
  });
});

// app.get('/auth/google',
//   passport.authenticate('google', { scope:
//       [ 'email', 'profile' ] }
// ));

// app.get( '/auth/google/callback',
//     passport.authenticate( 'google', {
//         successRedirect: '/auth/google/success',
//         failureRedirect: '/auth/google/failure'
// }));

module.exports = { userRoute };
