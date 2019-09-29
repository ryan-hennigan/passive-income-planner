const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Expense = new Schema({
  name:{
    type: String,
    required: true
  },
  report:{
    type: mongoose.Schema.Types.ObjectId
  },
  cost:{
      type: Number,
      required:true,
      default: 0
  },
  created:{
    type: Date,
    default: Date.now
  }
});


module.exports = User = mongoose.model('expense', Expense);