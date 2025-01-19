import React, { useState } from "react";

const ProfileModal = ({ onClose, onLogout }) => {
  const [isTOTP, setIsTOTP] = useState(true); // To manage TOTP section
  const [isTOTPEnabled, setIsTOTPEnabled] = useState(false); // To toggle TOTP on/off
  const [isOTPEnabled, setIsOTPEnabled] = useState(false); // To toggle OTP on/off

  const handleToggleTOTP = () => {
    setIsTOTPEnabled((prevState) => !prevState); // Toggle TOTP on/off
  };

  const handleToggleOTP = () => {
    setIsOTPEnabled((prevState) => !prevState); // Toggle OTP on/off
  };

  return (
    <div className="profile-modal">
      <ul>
        <li onClick={() => setIsTOTP(true)}>TOTP Setup</li>
        <li onClick={() => setIsTOTP(false)}>OTP Options</li>
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

          <button>Enable TOTP</button>
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

          <button>Enable OTP</button>
        </div>
      )}
    </div>
  );
};

export default ProfileModal;
