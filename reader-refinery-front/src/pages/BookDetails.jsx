import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import AuthContext from "../context/AuthContext";
import Navbar from "../components/navbar";
import "../styles/BookDetails.css";

const BookDetails = () => {
  const { id } = useParams();
  const { token, currentUser } = useContext(AuthContext);

  const state = useLocation().state;

  const [book, setBook] = useState(null);
  const [isReadMore, setIsReadMore] = useState(true);
  const [review, setReview] = useState([]);
  const [reviewInput, setReviewInput] = useState(state?.reviewInput || "");
  const [rateInput, setRateInput] = useState(state?.rateInput || "");
  const [editingReview, setEditingReview] = useState(null);
  const [editReviewInput, setEditReviewInput] = useState("");
  const [editRateInput, setEditRateInput] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  const handleEditReviewInput = (event) => {
    const { value } = event.target;
    setEditReviewInput(value);
  };

  const handleEditRateInput = (event) => {
    const { value } = event.target;
    setEditRateInput(value);
  };
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/addbook/${id}`, {
            method: "GET", // Fix: method should use colon (:), not equal (=)
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      
        const bookData = await response.json(); // Assuming your response contains JSON data
        setBook(bookData);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchBook();
  }, [id, token]); // Include token as a dependency to ensure it's up-to-date
  

  const handlePostReview = async (id) => {
    const review = reviewInput;
    const rating = rateInput;
    console.log("review", review);
    console.log("rating", rating);
    console.log("currentUser", currentUser.id);

    console.log("token", token);

    try {
      const response = await fetch(`http://localhost:3000/api/reviews/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: review,
          rating: rating,
          book: id,
          reviewer: currentUser.id,
        }),
      });
      console.log("posting review", response.data);
      if (response.status === 401) {
        window.alert("Please login to post a review");
      } else {
        const data = await response.json();
        console.log("data", data);
        setReview({});
        setReviewInput("");
        setRateInput("");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (review.length > 0) {
      const reviewerReview = review.find((r) => r.reviewer === currentUser.id);
      setEditingReview(reviewerReview);
    }
  }, [review, currentUser]);

  const handleEditReview = (review) => {
    // Toggle the edit mode
    setIsEditMode(!isEditMode);

    // Set the current review content and rating in the state
    setEditReviewInput(review.content);
    setEditRateInput(review.rating.toString());

    // Scroll to the review form at the bottom of the page
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleUpdateReview = async () => {
    const editreviewContent = editReviewInput;
    const rating = editRateInput;

    console.log("reviewContent", editreviewContent);
    console.log("rating", rating);

    try {
      const response = await axios.patch(
        `http://localhost:3000/api/reviews/${id}/${editingReview._id}`,
        {
          content: editreviewContent,
          rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Update the review in the state with the new content and rating
        setReview(
          review.map((r) =>
            r.id === editingReview.id
              ? { ...r, content: editreviewContent, rating: parseInt(rating) }
              : r
          )
        );

        // Clear the input fields
        setEditReviewInput("");
        setEditRateInput("");

        // Reset the editingReview state variable
        setEditingReview(null);
        window.location.reload();
      }
    } catch (error) {
      console.error("Update Review Error:", error.response.data.message);
    }
  };

  const handleDeleteReview = async (_id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (isConfirmed) {
      await axios
        .delete(`http://localhost:3000/api/reviews/${id}/${_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setReview(review.filter((r) => r._id !== _id));

          alert("Review deleted successfully");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    const fetchBookReview = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/reviews/${id}`
        );
        setReview(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookReview();
  }, [id]);

  //===================
  const ReviewCard = ({ review }) => {
    const renderStars = (rating) => {
      const stars = [];
      for (let i = 1; i <= rating; i++) {
        stars.push(
          <span
            key={i}
            className={`star ${i <= rating ? "filled" : ""}`}
            role="img"
            aria-label={i <= rating ? "filled star" : "empty star"}
          >
            ⭐️
          </span>
        );
      }
      return stars;
    };

    return (
      <div
        className="review-card"
        style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
      >
        <p>{review.content}</p>
        <div className="rating">{renderStars(review.rating)}</div>
        {review.reviewer === currentUser.id && (
          <>
            <button onClick={() => handleEditReview(review)}>Edit</button>
            <button onClick={() => handleDeleteReview(review._id)}>
              Delete
            </button>
          </>
        )}
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <style>{`
              body {
                padding-top: 80px;
                background-color: #333333;
              }
              h2 {
                color: white;
              }
              p {
                color: white;
              }
              h3 {
                color: white;
                padding-top: 20px;
                padding-bottom: 20px;
              }

              .a{
                color: #258F98;
              }
              .grid-container {
                display: grid;
                grid-template-columns: 1fr 2fr 1fr;
              }
              
              .grid-item {
                padding: 30px;
              }

              .descriptionBox {
                max-height: ${({ isReadMore }) =>
                  isReadMore ? "100px" : "none"};
                overflow: hidden;
              }

              .readMore {
                position: relative;
                bottom: 0;
                right: 0;
              }

              textarea {
                width: 90%;
                height: 100px;
                padding: 10px;
                background-color: transparent;
                margin-bottom: 10px;
                box-sizing: border-box;
              }
              button {
                border: 2px solid #293036;
                border-radius: 10px;
                padding: 12px 20px;
                background-color: white;
                text-transform: uppercase;
                font-size: 0.8rem;
                font-weight: 600;
                letter-spacing: 1px;
                color: black;
                cursor: pointer;
                transition: background-color 0.3s ease, color 0.3s ease;
              }
              
              button:hover {
                background-color: #258F98;
                border: 2px solid ffffff;
                color: #ffffff;
              }

              .image-container {
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
                border-radius: 5px;
                overflow: hidden;
              }
              .review-card {
                background-color: transparent;
                padding: 10px;
                margin-bottom: 10px;
                border-radius: 5px;
                border: "1px solid black";
                
              }

              .star {
                color: #ccc;
                font-size: 1.5rem;
              }
              
              .star.filled {
                color: gold;
              }
              
            `}</style>
      </Helmet>
      <Navbar />
      <div className="grid-container">
        {book ? (
          <>
            <div className="grid-item">
              <div className="image-container">
                <img
                  src={`${book.image}`}
                  alt={book.title}
                  className="image"
                />
              </div>
            </div>
            <div className="grid-item">
              <h2>{book.title}</h2>
              <p>Author: {book.author}</p>
              <p>
                {book.genres &&
                  book.genres.map((genre, index) => (
                    <span key={index} className={["genre-tag"]}>
                      {genre}
                    </span>
                  ))}
              </p>

              <div className="descriptionBox">
                <p>
                  {isReadMore && book.description
                    ? book.description.slice(0, 100) +
                      (book.description.length > 100 ? "..." : "")
                    : book.description}
                  {book.description && book.description.length > 100 && (
                    <span className="readMore" onClick={toggleReadMore}>
                      {isReadMore ? "...Read More" : " Show Less"}
                    </span>
                  )}
                </p>
              </div>

              <div className="reviews-cards">
                {review.length > 0 ? (
                  <div className="reviews-container">
                    <h3>Reviews</h3>
                    <div className="reviews">
                      {review.map((review) => (
                        <ReviewCard
                          review={review}
                          key={review.id}
                          handleDeleteReview={handleDeleteReview}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <p>No reviews available.</p>
                )}
              </div>

              {isEditMode && (
                <div className="review-form">
                  <h3>Edit Review</h3>
                  <textarea
                    placeholder="Write your review..."
                    value={editReviewInput}
                    onChange={handleEditReviewInput}
                  ></textarea>
                  <input
                    type="number"
                    placeholder="Rating (1-5)"
                    min="1"
                    max="5"
                    value={editRateInput}
                    onChange={handleEditRateInput}
                  />
                  <button onClick={handleUpdateReview}>Update Review</button>
                </div>
              )}
            </div>

            <div className="grid-item">
              {currentUser ? (
                <div className="review-form">
                  <h3>Post a Review</h3>
                  <textarea
                    placeholder="Write your review..."
                    value={reviewInput}
                    onChange={(event) => setReviewInput(event.target.value)}
                  ></textarea>
                  <input
                    type="number"
                    placeholder="Rating (1-5)"
                    min="1"
                    max="5"
                    value={rateInput}
                    onChange={(event) => setRateInput(event.target.value)}
                  />
                  <button onClick={() => handlePostReview(book._id)}>
                    Post Review
                  </button>
                </div>
              ) : (
                <p>Please login to post a review.</p>
              )}
            </div>
          </>
        ) : (
          <div className="grid-item">
            <p>Loading book details...</p>
          </div>
        )}
      </div>
    </>
  );
};

export default BookDetails;
