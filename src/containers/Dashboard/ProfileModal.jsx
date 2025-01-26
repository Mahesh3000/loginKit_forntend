import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileModal = ({ isOpen, onClose, user }) => {
  const [isTOTPEnabled, setIsTOTPEnabled] = useState(false);
  const [isOTPEnabled, setIsOTPEnabled] = useState(false);
  const navigate = useNavigate();

  const handleTOTPChange = () => {
    setIsTOTPEnabled((prev) => !prev);
  };

  const handleOTPChange = () => {
    setIsOTPEnabled((prev) => !prev);
  };
  console.log("user", user);

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear authentication token
    localStorage.removeItem(user?.username); // Clear user data (if saved)
    navigate("/"); // Redirect to home or login page
  };

  // Handle profile image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Set the profile image preview
      };
      reader.readAsDataURL(file); // Read the file as a data URL for preview
    }
  };
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-backdrop"></div>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="profile-header">
          <img
            src={user.profilePhoto} // Assuming user has profilePhoto property
            alt="User Profile"
            className="profile-image"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="image-upload-input"
          />
          <h2 className="modal-title">Profile Settings</h2>
        </div>
        <div className="modal-toggle">
          <label className="toggle-label">
            <span>Enable TOTP</span>
            <input
              type="checkbox"
              checked={isTOTPEnabled}
              onChange={handleTOTPChange}
              className="toggle-input"
            />
          </label>
        </div>
        <div className="modal-toggle">
          <label className="toggle-label">
            <span>Enable OTP</span>
            <input
              type="checkbox"
              checked={isOTPEnabled}
              onChange={handleOTPChange}
              className="toggle-input"
            />
          </label>
        </div>
        <button onClick={onClose} className="modal-close-button">
          Close
        </button>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileModal;
