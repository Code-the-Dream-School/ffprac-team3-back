const mongoose = require('mongoose')

const UserLogonSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide username.'],
        minlenght: 3,
        maxlenght: 40
    },
    email: {
        type: String,
        required: [true, 'Please provide email.'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide valid e-mail address.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide password.'],
        minlenght: 8
    }
})

module.exports = mongoose.model('UserLogon', UserLogonSchema)