import React, { useState, useEffect } from "react";
import axios from "axios";
import BookContext from "../context/BookContext";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import Navbar from "../components/navbar";
import styles from "../styles/UserHomePage.module.css";

const RatingStars = (props) => {
  return (
    <div className={styles["rating-stars"]}>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button type="button" className={styles["star-button"]}>
            {index <= props.rating ? (
              <i className={`${styles.star} ${styles.filled}`}>★</i>
            ) : (
              <i className={`${styles.star} ${styles.empty}`}>☆</i>
            )}
          </button>
        );
      })}
      <span className={styles["star-rating"]}>{props.rating}/5</span>{" "}
      {/* Show number of stars */}
    </div>
  );
};

function Book({ book }) {
  console.log(book.image);
  return (
    <div className={styles.section + " " + styles["full-height"]}>
      <div className={styles["middle-div"]}>
        <div className={styles["left-section"]}>
          <Link to={`/addbook/${book._id}`}>
            <img
              src={`${book.image}`}
              alt="Book"
            />
          </Link>
        </div>
        <div className={styles["info-section"]}>
          <h3>{book.title}</h3>
          <h4>by {book.author}</h4>
          {book.genres.map((genre, index) => (
            <span key={index} className={styles["genre-tag"]}>
              {genre}
            </span>
          ))}
          <RatingStars rating={book.rating} />
        </div>
        <div className={styles["right-section"]}>
          <button type="button" className={styles["bookmark-button"]}>
            Bookmark
          </button>
        </div>
      </div>
    </div>
  );
}

function UserHomePage() {
  // Declare state variables using the useState Hook
  const [showScrollButton, setShowScrollButton] = useState(true);
  const [books, setBooks] = useState([]);

  // Use the useEffect Hook for side effects
  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScrollButton && window.pageYOffset > 100) {
        setShowScrollButton(true);
      } else if (showScrollButton && window.pageYOffset <= 100) {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", checkScrollTop);

    axios
      .get("http://localhost:3000/api/addbook/allbooks")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, [showScrollButton]); // Make sure to add dependencies here

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <BookContext.Provider value={books}>
      <div className={styles["user-home-page"]}>
        <Helmet>
          <style>{`
            body {
              padding-top: 70px;
            }
          `}</style>
        </Helmet>
        <Navbar />
        <div style={{ padding: "0 20px" }}>
          <h2 className={styles["heading-style"]}>Browse all books</h2>
          {books.map((book, index) => (
            <Book key={index} id={book.id} book={book} />
          ))}
        </div>

        {showScrollButton && (
          <button
            type="button"
            className={styles["scroll-button"]}
            onClick={scrollTop}
          >
            <i className="fas fa-arrow-up"></i>
          </button>
        )}
      </div>
    </BookContext.Provider>
  );
}

export default UserHomePage;
