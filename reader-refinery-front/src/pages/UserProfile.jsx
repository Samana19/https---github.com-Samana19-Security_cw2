import React, { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import DeleteConfirmation from "../components/deleteconfirmation";
import "../styles/UserProfile.css";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const UserProfile = () => {
  const {currentUser, token} = useContext(AuthContext);
  const [user, setUser] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const[editing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  //upload image
  const [image, setImage] = useState(null); 

  const [isEditable, setIsEditable] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);

      const res = await fetch("http://localhost:3000/uploads/uploadImage", {
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
    }};
    

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (currentUser && currentUser.id){
          const response = await axios.get(`http://localhost:3000/api/users/${currentUser.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.data);
          setName(response.data.name);
          setEmail(response.data.email);
          setPassword(response.data.password);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    if (currentUser && currentUser.id){
      fetchUserData();
    }
  }, [currentUser, token]);

  const handleEdit=  () => {
    setIsEditable(true);
  };


  const handleEditSubmit = async(e) => {
    e.preventDefault();
    setIsEditable(true);

    try {
      const response = await fetch(`http://localhost:3000/api/users/${currentUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedUser),
      });

      if (!response.ok) {
        throw new Error("Edit failed");
      }

      const updatedUser = await response.json();
      setUser(updatedUser.user);
      console.log(updatedUser);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = () => {
    // Perform logic to save the updated user information
    setIsEditable(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  // const handleDeleteConfirm = async () => {
  //   try {
  //     const response = await axios.delete(`http://localhost:3000/api/users/${id}`);
  //     console.log(response.data);

  //     // Perform any additional logic after successful deletion

  //     // Redirect the user to a different page or perform any other necessary actions
  //     // ...
  //   } catch (error) {
  //     console.error("Error deleting user account:", error);
  //   } finally {
  //     setShowDeleteConfirmation(false);
  //   }
  // };

  // const handleDeleteCancel = () => {
  //   setShowDeleteConfirmation(false);
  // };

  return (
    <>
      <Helmet>
        <style>{`
          a {
            color: white;
          }
          h2 {
            color: white;
          }
          p {
            color: white;
          }
          h3 {
            color: white;
            padding-top: 20px;
            padding-bottom: 20px;
          }

          label {
            color: white;
          }

          .form-group {
            margin-bottom: 20px;
          }
        `}</style>
      </Helmet>
      <Navbar />
      <div className="user-profile">
        <h2>User Profile</h2>

        {/* //======================= */}
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            disabled={!isEditable}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            disabled={!isEditable}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            disabled={!isEditable}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div> */}

        <div className="button-group">
          {isEditable ? (
            <>
              <button className="profile-button" onClick={handleSave}>
                Save
              </button>
              <button className="profile-button" onClick={handleDeleteClick}>
                Delete Account
              </button>
            </>
          ) : (
            <button className="profile-button" onClick={handleEdit}>
              Edit
            </button>
          )}
        </div>

        {/* {showDeleteConfirmation && (
          <div className="delete-container">
            <DeleteConfirmation
              onConfirm={handleDeleteConfirm}
              onCancel={handleDeleteCancel}
            />
          </div>
        )} */}
      </div>
    </>
  );
};

export default UserProfile;
