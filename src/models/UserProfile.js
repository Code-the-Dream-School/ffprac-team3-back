const mongoose = require('mongoose')

const UserProfileSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name.']
    }, 
    agegroup: {
        type: String,
        enum: ['18 - 30', '31 - 40', '41 - 50', '51 - 60', '61 - 70', '71 - 80'],
        required: [true, 'Please provide age group.']
    },
    email: {
        type: String,
        ref: 'UserLogon'
    },
    phone: {
        type: String, 
        required: [true, 'Please provide phone number.'],
        unique: true,
        match: [ /^[0-9]+$/, 'Please provide valid phone number.' ],
        minlenght: 10,
        maxlenght: 10
    },
    address: {
        type: String,
        required: [true, 'Please provide address.']
    }
})

module.exports = mongoose.model('UserProfile', UserProfileSchema)