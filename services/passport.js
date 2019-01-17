const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

const User = require('mongoose').model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) =>{
    User.findById(id)
        .then(user => {
            done(null, user);
        })
});



passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        proxy: true,
        callbackURL:'/auth/google/callback'
        }, 
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ googleId: profile.id})
             
                 if (existingUser){
                     //already have a record with the given profile ID
                      return done(null, existingUser);
                 } 
                     const user = await new User({googleId: profile.id}).save()
                     done(null, user);
            }
        )
    );
