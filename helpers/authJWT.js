const jwt = require('jsonwebtoken');
const User = require('../models/user');

function verify(req,res,next){
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    jwt.verify(req.token, process.env.JWT_KEY, (err,authData) => {
      if(err){
        res.sendStatus(403);
      }
      else{
        req.authData = authData;
        next();
      }
    });
  }
  else{
    res.sendStatus(403);
  }
}

function adminVerify(req,res,next){
  if(req.authData.user.admin === true){
    next();
  }
  else{
    res.sendStatus(403);
  }
}


module.exports = { verify,adminVerify };