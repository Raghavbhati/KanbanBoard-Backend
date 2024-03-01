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

passport.serializeUser((profile, done) => {
	done(null, profile);
});
passport.deserializeUser((profile, done) => {
	done(null, profile);
});

module.exports = passport;
