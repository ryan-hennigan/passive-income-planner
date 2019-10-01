const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');


// models
const User = require('../models/user');

function getUsers(req,res){
  User.find()
    .then(users => res.json(users));
}

function getUser(req,res){
  User.findById(req.params.id, (err,user)=>{
    if(err){
      return res.sendStatus(403);
    }
    if(!user){
      return res.sendStatus(403);
    }
    return res.json(user);
  });
}

function registerUser(req,res){
  
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    res.json({success:false});
    return;
  }

  User.findOne({email:req.body.email}, (err,user)=>{
    if(err){
      console.log(err);
      res.json({success:false});
      return;
    }
    if(user){
      res.json({success:false, msg:"user already exists"});
      return;
    }
    const newUser = new User({
      name: req.body.name,
      email:  req.body.email,
      password: req.body.password
    });
    newUser.password = newUser.generateHash(req.body.password);

    // Save the new user
    newUser.save((err)=>{
        if(err){
          console.log(err);
          res.json({success:false});
          return;
        }
        res.json({success:true});
    });
  });
}

function deleteUser(req,res){
  User.findById(req.params.id, (err,user)=>{
    if(err){
      return res.json({success:false});
    }
    if(!user){
      return res.json({success:false});
    }
    else{
      user.remove()
        .then(()=>{
          res.json({success:true});
        });
    }
  });
}

function loginUser(req,res){

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    res.json({success:false});
    return;
  }

  //req.body.email = req.body.email.toLowerCase();

  User.findOne({email:req.body.email}, (err,user)=>{
    if(err){
      return res.json({success:false, msg: err});
    }
    if(!user){
      return res.json({success:false});
    }
    if(user.validPassowrd(req.body.password)){
      jwt.sign({user}, process.env.JWT_KEY, (err,token)=>{
        return res.json({
          user,
          token
        });
      });
    }
    else{
      res.json({success:false});
      return;
    }
  });
}

module.exports = {getUsers,getUser, loginUser, registerUser, deleteUser};