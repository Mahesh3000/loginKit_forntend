import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";

const Otp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = () => {
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    setError(""); // Clear errors

    // Handle OTP verification (API call, etc.)
    console.log("OTP entered:", otp);

    // Redirect after successful verification
    navigate("/dashboard"); // Replace with your target route
  };
  return (
    <div className="login-center">
      <h2>Verify your account</h2>
      <p>Enter the 6-digit OTP sent to your email or phone number.</p>
      <form>
        <input
          type="text"
          maxLength={6}
          placeholder="Enter OTP"
          value={otp}
          onChange={handleChange}
          required
        />
        <div className="login-center-options">
          <div className="error-div">{error}</div>
          <a href="#" className="forgot-pass-link">
            Resend OTP
          </a>
        </div>
        <div className="login-center-buttons">
          <button type="button" onClick={handleSubmit}>
            Verify
          </button>
          <button type="button" onClick={handleSubmit}>
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default Otp;
