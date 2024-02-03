const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Review = require('../../models/Review');
// const Books = require('../../models/Books');
const AddBooks = require('../../models/AddBook');
const {auth} = require('../../middleware/auth');

// Fetch all reviews
router.get('/:book', async (req, res,next) => {
  AddBooks.findById(req.params.book)
    .then((books)=>{
      if(!books){
        return res.status(404).json({ message: "Book not found" });
      }
       Review.find({book: req.params.book})
       .then((reviews)=>{
          res.status(200).json(reviews);
       })
       .catch((err)=>{
          res.status(500).json({ message: err.message });
       })
       .catch(next);
    })
});

// Post a new review
router.post('/:book', auth, async (req, res,next) => {
  const {book} = req.params;
  const reviewer = req.user.id;
  const {rating, content} = req.body;
  console.log(book, reviewer, rating, content);

  const review = new Review({
    book,
    reviewer,
    rating,
    content
  })

  console.log(review);
  
  review
    .save()
    .then((savedReview) => {
      return AddBooks.findByIdAndUpdate(book, 
        { $push: { reviews: savedReview._id } }, 
        { new: true }
        )
    })
    .then((updatedBook) => {
      console.log(updatedBook);
      if(!updatedBook) {
        return res.status(404).json({ message: "Book not found" });
      }
      res.status(201).json(updatedBook);
    })
    .catch(next);
});

//===================================

// Fetch a specific review
router.get('/:book/:reviewId', async (req, res) => {
  const {reviewId} = req.params;
  Review.findById(reviewId)
    .populate('reviewer',"name")
    .then((review)=>{
      if(!review){
        return res.status(404).json({ message: "Review not found" });
      }
      res.status(200).json(review);
    }
    )
    .catch((err)=>{
      res.status(500).json({ message: err.message });
    }
    )
});


// Update a review
router.patch('/:book/:reviewId', auth, async (req, res, next) => {
  const { reviewId } = req.params;
  const { rating, content } = req.body;

  try {
    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { rating, content },
      // { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json(updatedReview);
  } catch (error) {
    next(error);
  }
});


// Delete a specific review
// router.delete('/:book/:reviewId', async (req, res) => {
//   try {
//     const deletedReview = await Review.findByIdAndDelete(req.params.id);
//     if (deletedReview == null) {
//       return res.status(404).json({ message: 'Cannot find review to delete' }); 
//     }
//     res.status(200).json({ message: 'Deleted the review ' });
//   } catch(err) {
//     return res.status(500).json({ message: err.message });
//   }
// });

// Delete a review
router.delete('/:book/:reviewId', auth, async (req, res, next) => {
  const { book, reviewId } = req.params;

  try {
    // Delete the review
    const deletedReview = await Review.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      return res.status(401).json({ message: "Review not found" });
    }

    // Remove the review's ID from the book's reviews array
    const updatedBook = await AddBooks.findByIdAndUpdate(
      book,
      { $pull: { reviews: reviewId } },
      { new: true }
    );

    res.status(200).json({ message: "Review deleted", updatedBook });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
