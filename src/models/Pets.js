const mongoose = require('mongoose');

const PetsSchema = mongoose.Schema(
  {
    type: {
        type: String,
        required: [true, 'Please provide a pet type'],
    },
    breed: {
        type: String,
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
        type: mongoose.Mixed,
    },
    fileImages: {
        type: Object,
        ref: 'GridFsFiles'
    },
    fileMedical: {
        type: Object,
        ref: 'GridFsFiles'
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
