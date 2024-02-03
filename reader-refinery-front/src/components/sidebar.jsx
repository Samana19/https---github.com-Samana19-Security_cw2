import React from 'react';
import '../styles/Sidebar.css';
const genres = ["Fantasy", "Adventure", "Romance", "Contemporary", "Dystopian", "Mystery", "Horror", "Thriller", "Paranormal", "Historical Fiction", "Science Fiction", "Memoir", "Cooking", "Art", "Self-help / Personal", "Development", "Motivational", "Health", "History", "Travel"];


const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Book Genres</h2>
      <ul className="genre-list">
        {genres.map((genre, index) => (
          <li key={index}>
            {genre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
