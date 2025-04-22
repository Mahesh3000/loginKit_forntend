import React, { memo, useState } from "react";
import LeftSideContainer from "./LeftSideContainer";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(8768767868);

  const maskEmail = (email) => {
    const [localPart, domain] = email.split("@");
    const maskedLocalPart = localPart[0] + "******";
    return `${maskedLocalPart}@${domain}`;
  };

  const maskPhoneNumber = (phoneNumber) => {
    const strNumber = phoneNumber.toString();
    return "******" + strNumber.slice(-4);
  };

  const handleEmailSubmit = () => {
    if (!email) {
      setError("Email is required.");
      return;
    }
    setError("");
    setIsCodeSent(true);
  };

  const handleCodeSubmit = () => {
    if (resetCode.length !== 6) {
      setError("Please enter a valid 6-digit reset code.");
      return;
    }
    if (!newPassword) {
      setError("Please enter a new password.");
      return;
    }
    setError(""); // Clear errors
    console.log(
      "Password reset with code:",
      resetCode,
      "New Password:",
      newPassword
    );

    navigate("/");
  };
  return (
    <div className="login-main">
      <LeftSideContainer />
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={Logo} alt="" />
          </div>
          <div className="login-center">
            {!isCodeSent ? (
              <div>
                <h2>Forgot Password</h2>
                <p>
                  Enter your registered email address to receive a password
                  reset link.
                </p>
                <form>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className="login-center-options">
                    <div className="error-div">{error}</div>
                  </div>
                  <div className="login-center-buttons">
                    <button
                      type="button"
                      onClick={handleEmailSubmit}
                      className="sign-up-btn"
                    >
                      Send Reset Link
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate("/")}
                      className="sign-up-btn"
                    >
                      Go Back
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div>
                <h2>Reset Your Password</h2>
                <p>
                  Enter the 6-digit OTP sent to {maskEmail(email)} or{" "}
                  {maskPhoneNumber(phoneNumber)}.
                </p>
                <form>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter reset code"
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <div className="login-center-options">
                    <div className="error-div">{error}</div>
                  </div>
                  <div className="login-center-buttons">
                    <button
                      type="button"
                      onClick={handleCodeSubmit}
                      className="sign-up-btn"
                    >
                      Reset Password
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate("/")}
                      className="sign-up-btn"
                    >
                      Go Back
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
