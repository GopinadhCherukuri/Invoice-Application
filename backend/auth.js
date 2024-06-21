
const passport=require('passport')
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
require('dotenv').config()
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env. GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:7007/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //    done(null, profile);
    // }
done(null,profile)}
)
);

passport.serializeUser((user,done)=>{
  done(null,user)
})
passport.deserializeUser((user, done)=>{
  done(null, user);
})