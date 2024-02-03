import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UserHomePage from './pages/UserHomePage';
import Navbar from './components/navbar';
import Footer from './components/footer'; 
import FeedBox from './components/feedbox'; 
import Post from './components/post';
import Sidebar from './components/sidebar';
import BookDetails from './pages/BookDetails';
import Book from './components/bookshelf';
import InitialLanding from './pages/Landing';
import PostReview from './pages/PostReview';
import UserProfile from './pages/UserProfile';
import AddBooks from './pages/AddBookPage';



const App = () => {
  return (
    <BrowserRouter>

    <wc-toast position="top-right"></wc-toast>
      <Routes>
      <Route path="/" element={<InitialLanding />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/home" element={<HomePage />}></Route>
      <Route path="/navbar" element={<Navbar />}></Route>
      <Route path="/footer" element={<Footer />}></Route>
      <Route path="/feedbox" element={<FeedBox />}></Route>
      <Route path="/post" element={<Post />}></Route>
      <Route path="/sidebar" element={<Sidebar />}></Route>
      <Route path="/addbook/:id" element={<BookDetails />}></Route>
      <Route path='/books' element={<Book />}></Route>
      <Route path='/userhomepage' element={<UserHomePage />}></Route>
      <Route path='/postreview' element={<PostReview />}></Route>
      <Route path="/profile" element={<UserProfile />} ></Route>
      <Route path="/addbook" element={<AddBooks />}></Route>


      

      </Routes>
    </BrowserRouter>
  );
};

export default App;
