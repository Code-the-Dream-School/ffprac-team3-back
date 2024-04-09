const mongoose = require('mongoose');

const PetsSchema = mongoose.Schema({
  type: {
    type: String,
    require: [true, 'Please provide a pet type'],
  },
  age: {
    type: String,
  },
  sex: {
    type: String,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  isFavorite: {
    type: Boolean,
  },
  location: {
    type: String,
  },
  authorizedUsers: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'UserProfile',
    },
  ],
});

module.exports = mongoose.model('Pet', PetsSchema);
