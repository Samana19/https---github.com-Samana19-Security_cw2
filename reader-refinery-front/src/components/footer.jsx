import React from 'react';
import { AiOutlineInstagram, AiOutlineTwitter, AiOutlineFacebook, AiOutlineMail } from 'react-icons/ai'; // Importing icons from react-icons
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="social">
        <a href="#"><AiOutlineMail /></a>
        <a href="#"><AiOutlineInstagram /></a>
        <a href="#"><AiOutlineTwitter /></a>
        <a href="#"><AiOutlineFacebook /></a>
      </div>
      <ul className="list">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Services</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Terms</a>
        </li>
        <li>
          <a href="#">Privacy Policy</a>
        </li>
      </ul>
      <p className="copyright">Future Coders @ {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
