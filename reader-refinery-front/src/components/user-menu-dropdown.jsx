import React, { useState, useContext } from 'react';
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import AuthContext from '../context/AuthContext';
import  '../styles/UserMenuDropdown.css';

const UserMenuDropdown = ({ isVisible }) => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  if (!isVisible) return null; 

  const handleLogout = () => {
    logout(); 
    navigate("/");
  }

  return (
    <div className="dropdown-container">
      <ul className="dropdown-menu show" role="menu">
        <li><a href="/profile">Profile</a></li>
        <li><a onClick={handleLogout}>Sign Out</a></li>
      </ul>
    </div>
  )
}

export default UserMenuDropdown;
