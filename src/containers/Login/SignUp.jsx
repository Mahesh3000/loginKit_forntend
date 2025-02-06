import React, { useEffect, useState } from "react";
import Image from "../../assets/image.png";
import Logo from "../../assets/logo.png";
import GoogleSvg from "../../assets/icons8-google.svg";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import LeftSideContainer from "./LeftSideContainer";
import { useNavigate } from "react-router-dom";
import { API_URLS } from "../constants";
import axios from "axios";
import { setUserData } from "../../redux";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });

  // Update function for individual fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessage("");
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePhoneNumber = (e) => {
    const value = e.target.value;

    if (/^\d*$/.test(value) && value.length <= 10) {
      setFormData((prevData) => ({
        ...prevData,
        phoneNumber: value,
      }));
    }
  };

  const handleLoginPath = () => {
    navigate("/");
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const { username, email, phoneNumber, password, confirmPassword } =
      formData;
    const mailValid = emailRegex.test(email);

    // Validate all fields
    if (!username || !email || !phoneNumber || !password || !confirmPassword) {
      setError(true);
      setMessage("Please Enter All Fields");
      return;
    }

    // Validate email
    if (!mailValid) {
      setMessage("Enter a Valid Email Address");
      return;
    }

    if (password !== confirmPassword) {
      setError(true);
      setMessage("Passwords do not match");
      return;
    }

    // Proceed with API calls
    try {
      // Send signup request
      const response = await axios.post(`${API_URLS.SIGNUP_API_URL}`, {
        email: email,
        username: username,
        password: password,
        phone_number: phoneNumber,
      });

      if (response.status === 200) {
        console.log("Sign up successful");

        // After successful signup, proceed with email verification
        try {
          const verifyResponse = await axios.post(
            `${API_URLS.VERIFY_EMAIL_URL}`,
            { email }
          );

          if (verifyResponse.status === 200 && verifyResponse.data.success) {
            console.log("Verification email sent successfully");
            setMessage("Registration successful! Please verify your email.");
            localStorage.setItem("user", JSON.stringify(response.data));
            localStorage.setItem("token", response?.data?.token);
            dispatch(setUserData(response.data.user));

            navigate("/dashboard"); // Redirect to the dashboard route
          } else {
            setMessage(
              verifyResponse.data.message ||
                "Failed to send verification email."
            );
          }
        } catch (error) {
          console.error(
            "Error sending verification email:",
            error.response?.data
          );
          setMessage(
            error.response?.data?.message || "Error sending verification email."
          );
        }
      }
    } catch (error) {
      console.error("Error during signup:", error.response.data);
      console.log("error.response.data.error", error.response);

      if (error.response) {
        // Handle known API error responses
        setMessage(
          error.response.data.error || "An error occurred during signup."
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
      <LeftSideContainer />
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={Logo} alt="" />
          </div>
          <div className="login-center">
            <h2>Create an account</h2>
            <p>Sign up to get started</p>
            <form onSubmit={handleSignUp}>
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handlePhoneNumber}
              />
              <div className="pass-input-div">
                <input
                  type={formData.showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
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
              <div className="pass-input-div">
                <input
                  type={formData.showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {formData.showConfirmPassword ? (
                  <FaEyeSlash
                    onClick={() =>
                      setFormData((prevData) => ({
                        ...prevData,
                        showConfirmPassword: !prevData.showConfirmPassword,
                      }))
                    }
                  />
                ) : (
                  <FaEye
                    onClick={() =>
                      setFormData((prevData) => ({
                        ...prevData,
                        showConfirmPassword: !prevData.showConfirmPassword,
                      }))
                    }
                  />
                )}
              </div>
              <div className="login-center-options">
                <div className="error-div">{message}</div>
              </div>
              <div className="login-center-buttons">
                <button type="submit" className="sign-up-btn">
                  Sign Up
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
          <p className="login-bottom-p">
            Already have an account?{" "}
            <a href="#" onClick={handleLoginPath}>
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
