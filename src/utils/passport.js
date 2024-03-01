// var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
// const passport = require("passport");
// const UserModel = require("../models/user.model");

// passport.use(new GoogleStrategy({
//     clientID: `${process.env.GOGGLE_CLIENT_ID}`,
//     clientSecret: `${process.env.GOGGLE_CLIENT_SECRET}`,
//     callbackURL: "http://localhost:9000/auth/google/callback",
//   },
//   async function(request, accessToken, refreshToken, profile, done) {
//     console.log("accessToken", accessToken)
//     console.log("User Data", profile)

//     try {
//       let user = await UserModel.findOne({ googleId: profile.id });
//       if (!user) {
//           user = await UserModel.create({
//           googleId: profile.id,
//           name: profile.displayName,
//           email: profile.emails[0].value
//         });
//       }
//       return done(null, user);
//     } catch (err) {
//       return done(err);
//     }
//   }
// ));

// passport.serializeUser((profile, done) => {
// 	done(null, profile);
// });
// passport.deserializeUser((profile, done) => {
// 	done(null, profile);
// });

const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy({
      clientID: `${process.env.GOGGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOGGLE_CLIENT_SECRET}`,
      callbackURL: "http://localhost:9000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile)
    }
  )
);

module.exports = passport;
