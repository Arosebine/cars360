const FacebookStrategy = require('passport-facebook').Strategy;
const passport = require('passport');
const User = require('../models/usermongo.model');





passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize the user , just like decode a jwt token
passport.deserializeUser((id, done) => {
  const user = User.findById(id);
  done(null, user);
});

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_SECRET_KEY,
      callbackURL: '/auth/facebook/redirect/',
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(
        { facebookId: profile.id },
        { profileName: profile.displayName },
        { picture: profile._json.picture }
      );

      const currentUser = await User.findOne({ facebookId: profile.id });

      if (currentUser) {
        console.log('Current user is '.red, currentUser);
        done(null, currentUser);
      }

      const user = await User.create({
        facebookId: profile.id,
        name: profile.displayName,
        email: profile.email,
        picture: profile._json.picture,
      });
      console.log(`new user created ${user}`.yellow);
      done(null, user);
    }
  )
);
