const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  dateOfEvent: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required:true
  },
  recipeId: {
    type: String,
    required: true
  }
})
    ;
module.exports = mongoose.model('Attempt', schema);
