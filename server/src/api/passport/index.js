import passport from 'passport';
import FacebookTokenStrategy from 'passport-facebook-token';

import { upsertFbUser } from '../controllers/authController';
import config from '../../config.json';


const APP_ID = config.fb.appId;
const APP_SECRET = config.fb.appSecret;

passport.use(new FacebookTokenStrategy({
  clientID: APP_ID,
  clientSecret: APP_SECRET
},
(accessToken, refreshToken, profile, done) => {
  upsertFbUser(accessToken, refreshToken, profile, (err, user) => {
    return done(err, user);
  });
}));

export default passport;