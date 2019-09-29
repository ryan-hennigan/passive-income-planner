const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ExpReport = new Schema({
  name:{
    type: String,
    required: true
  },
  expenses:{
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    default: []
  },
  created:{
    type: Date,
    default: Date.now
  }
});


module.exports = User = mongoose.model('expReport', ExpReport);