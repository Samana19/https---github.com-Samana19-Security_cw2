import React, { useState, useContext } from 'react';
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import AuthContext from '../context/AuthContext';
import UserMenuDropDown from './user-menu-dropdown';
import '../styles/Navbar.css';
import profileIcon from '../assets/user.png'; 
import logo from '../assets/logo.png'; 
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const handleProfileIconClick = () => {
   //navigate to /profile



  }

  const handleLogout = () => {
    logout(); 
    navigate("/");
  }
  const handleLogoClick = () => {
    navigate("/");
  }

  return (
    <>
      <Helmet>
        <style>{`
          body {
            background-color: #333333;
          }
          a {
            color: #ffffff;
          }
        `}</style>
      </Helmet>
      <nav>
        <div className="navbar bg-base-100">
          <div className="navbar-start">
          <img src={logo} alt="Reader's Refinery Logo" className="logo" onClick={handleLogoClick} />
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 adjust-menu">
              <li><a href="/home">Home</a></li>
              <li><a href="#section2">About</a></li>
              <li><a href="#section4">Contact</a></li>
              <li><a href="#section3">Community</a></li>
              <li><a href="/addbook">Add Book</a></li>
              
            </ul>
          </div>
          <div className="navbar-end">
            <input type="search" placeholder="Search all books..." className="search-bar" />

            
            {currentUser && (
              <>
              <Link to='/profile'>
              <button className='navbar-username-btn' > {currentUser.name}</button>
              </Link>

              <Link to='/profile'>
              <span className='navbar-signout-btn' onClick={handleLogout} > Logout</span>
              </Link>
                {/* <UserMenuDropDown isVisible={isVisible} />
                <img src={profileIcon} alt="Profile icon" className="profile-icon" onClick={handleProfileIconClick} />
                <button onClick={handleLogout}>Logout</button>  */}

                



                </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
