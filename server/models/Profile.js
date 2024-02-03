const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    contact: {
        type: [String],
        required: true
    },
    bio: {
        type: String
    },

    booksread: [
        {
            title: {
                type: String,
                required: true
            },
            genre: {
                type: String,
                required: true
            },
            
        }
    ],
    preferences: [
        {
          favoriteGenres: {
            type: [String],
            required: true
          },
          favoriteAuthors: {
            type: [String],
            required: true
          },
          readingLevel: {
            type: String,
            enum: ['Beginner', 'Intermediate', 'Advanced'],
            required: true
          },
          favoriteBooks: [
            {
              title: {
                type: String,
                required: true
              },
              author: {
                type: String,
                required: true
              },
              description: {
                type: String
              }
            }
          ]
        }
      ],
      
    social: {
        twitter: {
            type: String
        },
    
        linkedin: {
            type: String
        },
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('profile', ProfileSchema)