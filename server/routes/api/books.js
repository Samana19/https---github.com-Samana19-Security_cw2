const express = require('express');
const router = express.Router();
const Book = require("../../models/Books");

const {auth} = require('../../middleware/auth');

// GET route to retrieve all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST route to add a book
router.post('/', async (req, res) => {
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        rating: req.body.rating,
        description: req.body.description,
        image: req.body.image,
        genres: req.body.genres
    });

    try {
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET route to retrieve a book by id
router.get('/:id', (req, res) => {
    Book.findById(req.params.id)
        .then(book => res.status(200).json(book))
        .catch(err => res.status(400).json('Error: ' + err));

});

// PATCH route to update a book by id
router.patch('/:id', async (req, res) => {
    Book.findById(req.params.id)
        .then(book => {
            book.title = req.body.title;
            book.author = req.body.author;
            book.rating = req.body.rating;
            book.description = req.body.description;
            book.image = req.body.image;
            book.genres = req.body.genres;

            book.save()
                .then(() => res.status(200).json('Book updated.'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));

});


// DELETE route to delete a book by id
router.delete('/:id', async (req, res) => {
    Book.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json('Book deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});




//get all images from database
// router.get('/getallimages', async (req, res) => {
//     try {
//         const files = await Book.find({});
//         let fileInfos = [];
//         files.forEach((element) => {
//             fileInfos.push({
//                 id: element._id,
//                 name: element.name,
//                 url: element.image_url,
//             });
//         });
//         res.status(200).send(fileInfos);
//     } catch (err) {
//         res.status(500).send({
//             message: "Unable to find any images",
//         });
//     }
// });

module.exports = router;
