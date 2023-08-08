var mongoose = require('mongoose');

//Create user Schema for mongoose model
const user = new mongoose.Schema({
    firstname:{
        type: String, required: true, min:2, max:20
    },
    lastname:{
        type: String, required: true, min:2, max: 25
    },
    username:{
        type: String, required: true, min:8, max: 30
    },
    password:{
        type: String, required: true, min: 8, max: 25
    },
    roles:{
        type: {}, require: true
    },
    isActive:{
        type: Boolean, "default": true
    },
});

    module.exports = mongoose.model('user', user);