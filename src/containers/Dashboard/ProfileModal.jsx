import React, { useState } from "react";
import axios from "axios"; // Add axios to handle API requests
import { API_URLS } from "../constants";

const ProfileModal = ({ onClose, onLogout }) => {
  const [isTOTP, setIsTOTP] = useState(true); // To manage TOTP section
  const [isTOTPEnabled, setIsTOTPEnabled] = useState(false); // To toggle TOTP on/off
  const [isOTPEnabled, setIsOTPEnabled] = useState(false); // To toggle OTP on/off

  const handleToggleTOTP = async () => {
    try {
      const response = await axios.post(`${API_URLS.TOGGLE_TOTP}`, {
        enable: !isTOTPEnabled, // Send the new TOTP state
        identifier: "mahesh.sivngi@gmail.com",
      });

      if (response.status === 200) {
        setIsTOTPEnabled((prevState) => !prevState); // Toggle TOTP
        // alert(response.data.message); // Display success message
      }
    } catch (error) {
      console.error(
        "Error toggling TOTP:",
        error.response?.data || error.message
      );
      // alert("Failed to toggle TOTP. Please try again.");
    }
  };

  const handleToggleOTP = async () => {
    try {
      const response = await axios.post(`${API_URLS.TOGGLE_OTP}`, {
        identifier: "mahesh.sivngi@gmail.com",
        enable: !isOTPEnabled, // Send the new OTP state
      });

      if (response.status === 200) {
        setIsOTPEnabled((prevState) => !prevState); // Toggle OTP
        // alert(response.data.message); // Display success message
      }
    } catch (error) {
      console.error(
        "Error toggling OTP:",
        error.response?.data || error.message
      );
      // alert("Failed to toggle OTP. Please try again.");
    }
  };

  return (
    <div className="profile-modal">
      <ul>
        <li onClick={handleToggleTOTP}>TOTP Setup</li>
        <li onClick={handleToggleOTP}>OTP Options</li>
        <li onClick={onLogout}>Logout</li>
      </ul>

      {/* Conditional rendering based on whether TOTP or OTP is selected */}
      {isTOTP ? (
        <div className="totp-content">
          <h4>TOTP Setup</h4>
          <p>Here, you can set up your Time-based One-Time Password (TOTP).</p>

          {/* Toggle for enabling/disabling TOTP */}
          <div className="toggle-container">
            <label className="switch">
              <input
                type="checkbox"
                checked={isTOTPEnabled}
                onChange={handleToggleTOTP}
              />
              <span className="slider round"></span>
            </label>
            <span>{isTOTPEnabled ? "TOTP Enabled" : "TOTP Disabled"}</span>
          </div>

          <button onClick={handleToggleTOTP}>
            {isTOTPEnabled ? "Disable TOTP" : "Enable TOTP"}
          </button>
        </div>
      ) : (
        <div className="otp-content">
          <h4>OTP Options</h4>
          <p>Here, you can manage your One-Time Password (OTP) settings.</p>

          {/* Toggle for enabling/disabling OTP */}
          <div className="toggle-container">
            <label className="switch">
              <input
                type="checkbox"
                checked={isOTPEnabled}
                onChange={handleToggleOTP}
              />
              <span className="slider round"></span>
            </label>
            <span>{isOTPEnabled ? "OTP Enabled" : "OTP Disabled"}</span>
          </div>

          <button onClick={handleToggleOTP}>
            {isOTPEnabled ? "Disable OTP" : "Enable OTP"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileModal;
