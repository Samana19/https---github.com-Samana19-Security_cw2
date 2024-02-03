import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../styles/LoginPage.css";
import Navbar from "../components/navbar";

const LoginPage = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { setCurrentUser, setToken } = useContext(AuthContext);

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput({ ...input, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: input.email,
          password: input.password,
        }),
      });
  
      if (res.status === 401) {
        const data = await res.json();
        setError(data.error || "Invalid credentials");
      } else if (res.status === 200) {
        const data = await res.json();
        const payload = atob(data.token.split(".")[1]);
  
        window.localStorage.setItem("token", data.token);
        window.localStorage.setItem("currentUser", payload);
        setCurrentUser(JSON.parse(payload));
        navigate("/home");
      } else {
        // Handle other status codes
        setError("Unexpected error");
      }
    } catch (error) {
      // Network or other errors
      console.error("Login failed:", error);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="login-container">
        <div className="form-container sign-in-container">
          <form onSubmit={handleLogin} method="POST">
            <h1>Login </h1>
            <span> Sign in to your account</span>
            <div>
              <label htmlFor="email">
                <input
                  required
                  id="email"
                  type="email"
                  placeholder="Enter Email"
                  value={input.email}
                  name="email"
                  onChange={handleChange}
                />
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
                  onChange={handleChange}
                />
              </label>
            </div>
            <a href="/">Forgot your password?</a>
            <button type="submit">Login</button>
            {error && <p className="error-message">{error}</p>}
            {error === "Account locked. Try again later." && (
              <p className="lockout-message">
                Your account is temporarily locked. Please try again later.
              </p>
            )}
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start the journey with us</p>
              <a href="/register">
                <button className="ghost" id="signUp">
                  Register
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;