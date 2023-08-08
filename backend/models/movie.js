const mongoose = require('mongoose');
//create mongoose model for backend
const movie = new mongoose.Schema({
    title:{
        type: String, required: true
    },
    ageRating:{
        type: Number, required: true
    },
    genre: {
        type: String, required: true
    },
    description: {
        type: String, required: true
    },
    cast:{
        type: {}, required : true    
    },
    price:{
        type: Number, required: true
    },
    userRating: {
        type: Number, "default": 0, min: 0, max: 5
    },
    imageUri:{
        type: String
    }
});

module.exports = mongoose.model('movie', movie);
