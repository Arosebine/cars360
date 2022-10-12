const passport = require('passport');
const User = require('../models/usermongo.model');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize the user , just like decode a jwt token
passport.deserializeUser((id, done) => {
  const user = User.findById(id);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3479/profile',
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
        username: profile.displayName,
        picture: profile._json.picture,
        email: profile.email,
      });
      console.log(`new user created ${user}`.yellow);
      done(null, user);
    }
  )
);