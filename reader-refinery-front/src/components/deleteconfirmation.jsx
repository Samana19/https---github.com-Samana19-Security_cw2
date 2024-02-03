import React from "react";
import '../styles/DeleteConfirmation.css'

const DeleteConfirmation = ({ onConfirm, onCancel }) => {
  return (
    <div className="delete-confirmation">
      <p>Are you sure you want to delete your account?</p>
      <button className="profile-button" onClick={onConfirm}>
        Confirm Delete
      </button>
      <button className="profile-button" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
};

export default DeleteConfirmation;
