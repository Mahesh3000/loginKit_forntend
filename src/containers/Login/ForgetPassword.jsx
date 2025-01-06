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

  const handleEmailSubmit = () => {
    if (!email) {
      setError("Email is required.");
      return;
    }
    setError(""); // Clear errors
    console.log("Password reset email sent to:", email);

    // Simulate sending a reset code
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

    // Redirect or complete password reset
    alert("Password reset successfully!");
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
                    <button type="button" onClick={handleEmailSubmit}>
                      Send Reset Link
                    </button>
                    <button type="button" onClick={() => navigate("/")}>
                      Go Back
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div>
                <h2>Reset Your Password</h2>
                <p>
                  Enter the 6-digit reset code sent to your email and your new
                  password.
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
                    <button type="button" onClick={handleCodeSubmit}>
                      Reset Password
                    </button>
                    <button type="button" onClick={() => nav}>
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
