import React, { memo } from "react";
import LeftSideContainer from "./LeftSideContainer";
import Logo from "../../assets/logo.png";

const ForgetPassword = () => {
  return (
    <div className="login-main">
      <LeftSideContainer />
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={Logo} alt="" />
          </div>
          <div className="login-center">
            <h2>Welcome back!</h2>
            <p>Please enter your details</p>
            <form>
              <input type="email" placeholder="Email" />
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                />
                {showPassword ? (
                  <FaEyeSlash
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                ) : (
                  <FaEye
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                )}
              </div>

              <div className="login-center-options">
                <div className="error-div">{error}</div>
                <a
                  href="#"
                  className="forgot-pass-link"
                  onClick={handleForgetPasswordPath}
                >
                  Forgot password?
                </a>
              </div>
              <div className="login-center-buttons">
                <button type="button" onClick={handleLogin}>
                  Log In
                </button>

                <button type="button">
                  <img src={GoogleSvg} alt="" />
                  Continue with Google
                </button>
              </div>
            </form>
          </div>
          <p className="login-bottom-p">
            Already have an account?{" "}
            <a href="#" onClick={handleSignupPath}>
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
