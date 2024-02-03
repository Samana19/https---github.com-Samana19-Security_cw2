const express = require("express");
const router = express.Router();
require("dotenv").config();
const { auth } = require("../../middleware/auth");

const User = require("../../models/User");
const AddBooks = require('../../models/AddBook');

// GET route to retrieve all books
router.get('/allbooks', async (req, res) => {
    try {
        const books = await AddBooks.find();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// GET book by  ID (authorized)
router.get("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const book = await AddBooks.findById(id).populate("user", "name");

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//post a new book by user ID (authorized)
router.post("/", auth, async (req, res) => {
    const book = new AddBooks({
        title: req.body.title,
        author: req.body.author,
        rating: req.body.rating,
        description: req.body.description,
        image: req.body.image,
        genres: req.body.genres,
        user: req.user.id
    });

    try {
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET route to retrieve a book by id (protected by auth)
router.get('/:id', auth, (req, res) => {
    AddBooks.findById(req.params.id)
        .then(book => res.status(200).json(book))
        .catch(err => res.status(400).json('Error: ' + err));
    // ... your code
});

// PATCH route to update a book by id (protected by auth)
router.patch('/:id', auth, async (req, res) => {
    AddBooks.findById(req.params.id)
    .then(book => {
        book.title = req.body.title;
        book.author = req.body.author;
        book.rating = req.body.rating;
        book.description = req.body.description;
        book.image = req.body.image;
        book.genres = req.body.genres;
        book.user = req.user.id;

        book.save()
            .then(() => res.status(200).json('Book updated.'))
            .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));

});

// DELETE route to delete a book by id (protected by auth)
router.delete('/:id', auth, async (req, res) => {
    AddBooks.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json('Book deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;





  