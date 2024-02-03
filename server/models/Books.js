const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model('Book', BookSchema);
