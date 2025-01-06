import React, { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Otp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else {
      setIsDisabled(false);
    }

    return () => clearInterval(timer);
  }, [timeLeft]);

  console.log("timeLeft", timeLeft);

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
          {/* <div className="error-div">ouyusakhs</div> */}
          <div className="otp-timer">
            Resend OTP in: <strong>{timeLeft}</strong>
          </div>

          <a href="#" className="forgot-pass-link" disabled={isDisabled}>
            Resend OTP
          </a>
        </div>
        <div className="error-div">{error}</div>
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
