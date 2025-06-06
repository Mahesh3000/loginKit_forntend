import React, { useEffect, useState } from "react";
import Image from "../../assets/image.png";
import Logo from "../../assets/logo.png";
import GoogleSvg from "../../assets/icons8-google.svg";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import LeftSideContainer from "./LeftSideContainer";
import { useNavigate } from "react-router-dom";
import Mpin from "./Mpin";
import { setLoader, setUserData } from "../../redux";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_URLS } from "../constants";
import Loading from "../Loading";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMpinEnabled, setIsMpinEnabled] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [isMediumError, setIsMediumError] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const loader = useSelector((state) => state?.auth?.loader);

  console.log("loader", loader);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    showPassword: false,
  });

  const handleSignupPath = () => {
    navigate("/signup");
  };

  const handleForgetPasswordPath = () => {
    navigate("/forget-password");
  };

  const checkEmailVerification = async (emailId) => {
    try {
      const response = await axios.get(`${API_URLS.VERIFIED_EMAILS_LIST}`);
      const verifiedEmails = response.data.verifiedEmails;

      if (verifiedEmails.includes(emailId)) {
        setIsEmailVerified(true);
        setMessage("");
      } else {
        setIsEmailVerified(false);
        setError(true);
        setIsMediumError(true);
        setMessage(
          "Email is not verified. Please verify your email before proceeding."
        );
      }
    } catch (error) {
      console.error("Error fetching verified emails:", error);
      setMessage(
        "An error occurred while verifying the email. Please try again later."
      );
    }
  };

  const handleEmailBlur = async () => {
    if (formData?.username) {
      try {
        // Step 1: Call the get-user API to fetch user data
        const userResponse = await axios.get(
          `${API_URLS.GET_USER}/${formData.username}`
        );

        if (userResponse.status === 200) {
          const user = userResponse.data;
          if (user?.data) {
            checkEmailVerification(user.data.email);
          } else {
            setError(true);
            setIsMediumError(true);
            setMessage("User not found");
          }
        } else {
          setError(true);
          setIsMediumError(true);
          setMessage(
            userResponse?.data?.message || "Error fetching user data."
          );
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setError(true);
        setIsMediumError(true);
        if (error.response) {
          setMessage(
            error.response?.data?.message || "Error fetching user data."
          );
        } else if (error.request) {
          setMessage("Network error. Please check your internet connection.");
        } else {
          setMessage("An unexpected error occurred. Please try again later.");
        }
      }
    } else {
      // Handle case where the username is not provided
      setError(true);
      setMessage("Username or email is required.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setMessage("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setError(false);
    setMessage("");
    dispatch(setLoader(true));

    const { username, password } = formData;

    if (!username || !password) {
      setError(true);
      setMessage("Fields are required.");
      return;
    }

    try {
      const loginResponse = await axios.post(`${API_URLS.LOGIN_API_URL}`, {
        identifier: username,
        password: password,
      });

      // console.log("response", loginResponse.data);
      if (loginResponse.status === 200) {
        dispatch(setLoader(false));

        if (!loginResponse.data.success) {
          setError(true);
          setMessage(loginResponse?.data?.message);
          return;
        } else {
          const userDetails = loginResponse?.data;
          dispatch(setUserData(userDetails?.user));
          const parserUserDetails = JSON.stringify(userDetails);
          localStorage.setItem("token", userDetails?.data?.token); // or set a flag
          localStorage.setItem("user", parserUserDetails);
          navigate("/onboarding");
        }
      }
    } catch (error) {
      dispatch(setLoader(false));
      console.error("Error during login:", error.response?.data);
      if (error.response) {
        setError(true);
        setMessage(
          error.response.data.message || "An error occurred during login."
        );
      } else {
        // Handle network errors, etc.
        setMessage("Network error. Please try again later.");
      }
    }
  };

  const handleGoogleLogin = () => {
    window.open(`${API_URLS.GOOGLE_LOGIN}/callback`, "_self");
  };

  return (
    <div className="login-main">
      {loader && <Loading />}
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
                <form onSubmit={handleLogin}>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username or Email"
                    value={formData.username}
                    onChange={handleInputChange}
                    onBlur={handleEmailBlur}
                  />
                  {/* <div className="popover-message">i am good</div> */}
                  <div className="pass-input-div">
                    <input
                      type={formData.showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    {formData.showPassword ? (
                      <FaEyeSlash
                        onClick={() =>
                          setFormData((prevData) => ({
                            ...prevData,
                            showPassword: !prevData.showPassword,
                          }))
                        }
                      />
                    ) : (
                      <FaEye
                        onClick={() =>
                          setFormData((prevData) => ({
                            ...prevData,
                            showPassword: !prevData.showPassword,
                          }))
                        }
                      />
                    )}
                  </div>
                  <div className="login-center-options">
                    {error ? (
                      <div
                        className={isMediumError ? "mid-error" : "error-div"}
                      >
                        {message}
                      </div>
                    ) : (
                      <p></p>
                    )}
                    <a
                      href="#"
                      className="forgot-pass-link"
                      onClick={handleForgetPasswordPath}
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="login-center-buttons">
                    <button
                      type="submit"
                      className="sign-up-btn"
                      // disabled={!isEmailVerified}
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      className="google-btn"
                      onClick={handleGoogleLogin}
                    >
                      <img src={GoogleSvg} alt="Google Logo" />
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
