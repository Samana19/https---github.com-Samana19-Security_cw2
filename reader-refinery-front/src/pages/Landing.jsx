import React from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

import "../styles/InitialLanding.css";
import logo from "../assets/logo.png";

const InitialLanding = () => {
  let navigate = useNavigate();

  return (
    <div>
      <Helmet>
        <style>{`
         body {
          
          background-color: #258F98;
          
        }

        .a{
          color: #ffffff;
        }
        
        `}</style>
      </Helmet>

      <div className="parent-section">
        <img
          id="imageBkg"
          src="https://thestorygraph.com/assets/hero-image-9daf4eae0b6f8e9beb51f83fd4a99631698ca1c8c68ef07a1aae37ef8a477dd1.jpg"
          alt="Skiing"
        />

        <div className="hero-section">
          <h1>eat.</h1>
          <h1>sleep.</h1>
          <h1>read.</h1>
          <h1>repeat.</h1>
          <p>
            Grant yourself the joy of indulging in books that ignite the fire
            <br /> within your heart and mind.
          </p>

          <div className="button-container">
            
            <button className="hero-button-1" onClick={() => navigate("/login")}>Sign In</button>
            <button className="hero-button-2" onClick={() => navigate("/register")}>Sign Up</button>
          </div>
        </div>
      </div>

      <div className="menu-section">
        <div className="menu-logo">
          <img src={logo} alt="Logo" />
          <span className="logo-text">Reader's Refinery</span>
        </div>
        <div className="menu-button-section">
          <button
            className="menu-button"
            onClick={() => navigate("/userhomepage")}
          >
            Browse Books
          </button>
        </div>
      </div>
    </div>
  );
};

export default InitialLanding;
