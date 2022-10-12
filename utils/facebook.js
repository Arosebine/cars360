const FacebookStrategy = require('passport-facebook').Strategy;
const passport = require('passport');
const User = require('../models/usermongo.model');



passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

passport.use(new FacebookStrategy(
   {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_SECRET_KEY,
      callbackURL: 'https://cars360.herokuapp.com/profile',
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(
        { googleid: profile.id },
        { profileName: profile.displayName },
        { picture: profile._json.picture },
        { email: profile.email }
      );

      const currentUser = await User.findOne({ googleId: profile.id });

      if (currentUser) {
        console.log('Current user is '.red, currentUser);
        done(null, currentUser);
      }

      const user = await User.create({
        googleId: profile.id,
        name: profile.displayName,
        picture: profile._json.picture,
        email: profile.email,
      });
      console.log(`new user created ${user}`.yellow);
      done(null, user);
    }
  )
);
