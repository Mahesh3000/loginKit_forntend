import React, { useEffect, useState } from "react";
import Image from "../../assets/image.png";
import Logo from "../../assets/logo.png";
import GoogleSvg from "../../assets/icons8-google.svg";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import LeftSideContainer from "./LeftSideContainer";
import { useNavigate } from "react-router-dom";
import Mpin from "./Mpin";
import { setUserData } from "../../redux";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isMpinEnabled, setIsMpinEnabled] = useState(false);

  const handleSignupPath = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    dispatch(setUserData("user data stored in redux"));
    navigate("/onboarding");
  };

  const handleForgetPasswordPath = () => {
    navigate("/forget-password");
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
            <h2>Welcome back!</h2>
            <p>Please enter your details</p>
            {isMpinEnabled ? (
              <Mpin />
            ) : (
              <div>
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
            )}
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

export default Login;
