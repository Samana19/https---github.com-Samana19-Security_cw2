import React, { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/navbar";
import "../styles/AddBook.css";

const AddBooks = () => {
  const { token, currentUser } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); // Store the selected image file
  const [genres, setGenres] = useState([]);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);

      const res = await fetch("https://localhost:3000/uploads/uploadImage", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddBook = async (e) => {

    e.preventDefault();
    let imgdata = null;

    if (image) {
      imgdata = await upload();
    }

    try {
      const response = await fetch(`http://localhost:3000/api/addbook/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          author,
          rating,
          description,
          image: imgdata ? imgdata.image_url : null,
          genres,
          user: currentUser.id,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data.status === 201) {
        setTitle("");
        setAuthor("");
        setRating("");
        setDescription("");
        setImage(null);
        setGenres([]);

        console.log("Book added successfully");

        console.log("Alert will be shown now");
        // Display a window alert when the book is added successfully
        window.alert("Book added successfully");
      }
    } catch (error) {
      console.log("Add Book Error:", error.response.data.message);
    }

    window.location.reload();
  };

  return (
    <>
      <Navbar />
      <div className="add-books-container">
        <div className="form-container">
          <h2>Add a New Book</h2>
          <form className="add-book-form">
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>Author:</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <label>Rating:</label>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label>Image:</label>
            <input
              type="file"
              // accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <label>Genres:</label>
            <input
              type="text"
              value={genres}
              onChange={(e) => setGenres(e.target.value)}
            />
            <button onClick={handleAddBook} className="add-book-button">
              Add Book
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBooks;
