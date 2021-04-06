import express from 'express';
import passport from 'passport';
import GoogleAuth from 'passport-google-oauth';
import { GOOGLE_CLIENT_ID , GOOGLE_CLIENT_SECRET } from './../secrets';
const GoogleStrategy =GoogleAuth.OAuth2Strategy;


// Passport Setup


const router = express.Router();
var userProfile : object;

router.use(passport.initialize());
router.use(passport.session());

router.get('/success',(req,res) => {
    res.send(userProfile);
    userProfile={};
})

router.get('/error',(req,res) => {
    res.status(500).send('Error Loging In');
})

passport.serializeUser(function(user : object, cb) {
    cb(null, user);
});
  
passport.deserializeUser(function(obj : object, cb) {
    cb(null, obj);
});


// Google Auth


passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8081/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
router.get('/auth/google', 
passport.authenticate('google', { scope : ['profile', 'email'] }));

router.get('/auth/google/callback', 
passport.authenticate('google', { failureRedirect: '/error' }),
function(req, res) {
  // Authentication Successful
  res.redirect('http://localhost:3000/index.html');
});



export default router;