const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        autopopulate: true,
        required:true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    
});

module.exports = mongoose.model('Review', ReviewSchema);
