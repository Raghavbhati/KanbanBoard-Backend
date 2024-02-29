var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const passport = require("passport");
const UserModel = require("../models/user.model");

passport.use(new GoogleStrategy({
    clientID: `${process.env.GOGGLE_CLIENT_ID}`,
    clientSecret: `${process.env.GOGGLE_CLIENT_SECRET}`,
    callbackURL: "http://localhost:9000/auth/google/callback",
    scope: ["profile", "email"],
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    console.log("accessToken", accessToken)
    console.log("User Data", profile)

    done(null, profile)
    // UserModel.create({ googleId: profile.id,}, function (err, profile) {
    //   return done(err, profile);
    // });
  }
)); 

passport.serializeUser((profile, done) => {
	done(null, profile);
});
passport.deserializeUser((profile, done) => {
	done(null, profile);
});
