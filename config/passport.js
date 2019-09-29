const passport = require('passport');
const User = require('../models/user');

passport.serializeUser((user,done)=>{
  done(null, user.id);
});

passport.deserializeUser((id,done)=>{
  User.findById(id).then((user)=>{
      done(null,user);
  });
});