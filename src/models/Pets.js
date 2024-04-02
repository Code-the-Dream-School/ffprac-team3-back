const mongoose = require('mongoose')

const PetsSchema = mongoose.Schema({
    notes: {
        type: String
    }
}) 

module.exports = mongoose.model('Pets', PetsSchema)