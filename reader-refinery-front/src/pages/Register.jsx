import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import Navbar from '../components/navbar'; // Import Navbar component
import '../styles/Register.css';

const Register = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    digit: false,
    specialChar: false,
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
  
    setInput({ ...input, [name]: value });
  
    // Password complexity check
    if (name === 'password') {
      const complexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
      // Additional check: Ensure password does not contain user's name or email
      const lowercaseName = input.name.toLowerCase();
      const lowercaseEmail = input.email.toLowerCase();
  
      if (value.toLowerCase().includes(lowercaseName) || value.toLowerCase().includes(lowercaseEmail)) {
        setError("Password should not contain personal information.");
      } else {
        setPasswordValidation({
          length: value.length >= 8,
          lowercase: /[a-z]/.test(value),
          uppercase: /[A-Z]/.test(value),
          digit: /\d/.test(value),
          specialChar: /[@$!%*?&]/.test(value),
        });
  
        if (complexityRegex.test(value)) {
          setError(null);
        } else {
          setError("Password must meet the complexity requirements.");
        }
      }
    }
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = input;

    if (error) {
      window.alert(error);
      return; // Prevent form submission if there's an error
    }

    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        name,
        email,
        password,
      });

      if (response.status === 400 && response.data === "User already exists") {
        setError("User already exists");
        window.alert("User already exists");
      } else {
        setError(null);
        // Add a success alert here
        window.alert("User registered successfully");
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Something went wrong");
      window.alert("Something went wrong");
    }
  };

  return (
    <>
      <Navbar />
      <div className="register-container" id="container">
        <div className="form-container sign-in-container">
          <form method="POST" onSubmit={handleSubmit}>
            <h1>Create Account</h1>

            <span>Use your email for registration</span>
            <div>
              <label htmlFor="name">
                <input
                  required
                  id="name"
                  type="text"
                  placeholder="Enter Full Name"
                  value={input.name}
                  name="name"
                  onChange={handleChange} />
              </label>
            </div>
            <div>
              <label htmlFor="email">
                <input
                  required
                  id="email"
                  type="email"
                  placeholder="Enter Email"
                  value={input.email}
                  name="email"
                  onChange={handleChange} />
              </label>
            </div>

            <div>
              <label htmlFor="password">
                <input
                  required
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  value={input.password}
                  name="password"
                  onChange={handleChange} />
              </label>
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
            <button type="submit">Register</button>
          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <a href="/login">
                <button className="ghost" id="signIn">Login</button>
              </a>
              <div className="password-constraints-container">
        <h3>Password Constraints:</h3>
        <ul>
          <li className={passwordValidation.length ? 'valid' : 'invalid'}>{passwordValidation.length ? '✅' : '❌'} At least 8 characters</li>
          <li className={passwordValidation.lowercase ? 'valid' : 'invalid'}>{passwordValidation.lowercase ? '✅' : '❌'} At least one lowercase letter</li>
          <li className={passwordValidation.uppercase ? 'valid' : 'invalid'}>{passwordValidation.uppercase ? '✅' : '❌'} At least one uppercase letter</li>
          <li className={passwordValidation.digit ? 'valid' : 'invalid'}>{passwordValidation.digit ? '✅' : '❌'} At least one digit</li>
          <li className={passwordValidation.specialChar ? 'valid' : 'invalid'}>{passwordValidation.specialChar ? '✅' : '❌'} At least one special character</li>
        </ul>
      </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Register;
