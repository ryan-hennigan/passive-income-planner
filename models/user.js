const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: false
  },
  admin:{
    type: Boolean,
    required:true,
    default: false
  },
  created:{
    type: Date,
    default: Date.now
  }
});

UserSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8),null);
};

UserSchema.methods.validPassowrd = function(password){
  return bcrypt.compareSync(password, this.password);
};

module.exports = User = mongoose.model('user', UserSchema);