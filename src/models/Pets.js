const mongoose = require('mongoose');

const PetsSchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, 'Please provide a pet type'],
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
    file: {
      type: Object,
      ref: 'GridFsFiles'
    },
    description: {
      type: String,
    },
    isFavorite: {
      type: Boolean,
    },
    location: {
      type: mongoose.Mixed,
    },
    authorizedUsers: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'UserProfile',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Pet', PetsSchema);
