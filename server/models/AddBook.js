const mongoose = require('mongoose');

const AddBookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        trim: true
    },  
    image: {
        type: String,
        trim: true
    },
    genres: {
        type: [String],
        required: true
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
        autopopulate: true
    }],

    //add user id
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        autopopulate: true
    }
});

module.exports = mongoose.model('AddBook', AddBookSchema);
