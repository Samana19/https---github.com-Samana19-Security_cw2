import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/BookShelf.css';

const BookShelf = () => {
 const navigate = useNavigate();
  const books = [
    { id: 1,
         title: 'Book 1', 
         genre: 'Fiction', 
         author: 'Author 1', 
         image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTYY7n0e-GylssxKw9s-5EYUo65I3liFsIGEVo5ynV3PZngtaCV', 
         }, 

    { id: 2,
            title: 'Book 2',
            genre: 'Fiction',
            author: 'Author 2',
            image: 'https://m.media-amazon.com/images/I/61wNePIM8kL._AC_UF1000,1000_QL80_.jpg',
           
        },

    { id: 3,

            title: 'Book 3',
            genre: 'Fiction',
            author: 'Author 3',
            image: 'https://m.media-amazon.com/images/I/81Whkax7IGL._AC_UF894,1000_QL80_.jpg',
    },
    { id: 4,
      title: 'Book 1', 
      genre: 'Fiction', 
      author: 'Author 1', 
      image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTYY7n0e-GylssxKw9s-5EYUo65I3liFsIGEVo5ynV3PZngtaCV', 
      }, 

 { id: 5,
         title: 'Book 2',
         genre: 'Fiction',
         author: 'Author 2',
         image: 'https://m.media-amazon.com/images/I/61wNePIM8kL._AC_UF1000,1000_QL80_.jpg',
        
     },

 { id: 6,

         title: 'Book 3',
         genre: 'Fiction',
         author: 'Author 3',
         image: 'https://m.media-amazon.com/images/I/81Whkax7IGL._AC_UF894,1000_QL80_.jpg',
 },
  { id: 7,
    title: 'Book 1',
    genre: 'Fiction',
    author: 'Author 1',
    image: 'https://m.media-amazon.com/images/I/81Whkax7IGL._AC_UF894,1000_QL80_.jpg',
    },
    // Same book data as before
  ];

  const [openedBookId, setOpenedBookId] = useState(null);

  const handleBookClick = (bookId) => {
    setOpenedBookId(bookId === openedBookId ? null : bookId);
  };

  const redirectToDetailsPage = (bookId) => {
    navigate(`/bookdetails/${bookId}`);
  };


  return (
    <div className="background-container"> 
    <div className="book-list">
      {books.map((book) => (
       <div key={book.id} className={`book book-shadow ${openedBookId === book.id ? 'open' : ''}`} 
       onClick={() => handleBookClick(book.id)}>

          
          {openedBookId === book.id ? ( // If the book is opened
            <div className="book-info">
              <h3>{book.title}</h3>
              <p>Genre: {book.genre}</p>
              <p>Author: {book.author}</p>
              <button onClick={() => redirectToDetailsPage(book.id)}>View Details</button>
            </div>
          ) : (  // If the book is not opened
            <div className="book-cover">
              <img src={book.image} alt={book.title} />
            </div>
          )}
        

        </div>
        
      ))}
      </div>
    </div>
  );
};

export default BookShelf;
