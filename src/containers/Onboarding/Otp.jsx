import React, { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URLS } from "../constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoader } from "../../redux";

const Otp = ({ userData, sendEmailToUser }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [isDisabled, setIsDisabled] = useState(true);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(8768767868);

  const maskEmail = (email) => {
    const [localPart, domain] = email.split("@");
    const maskedLocalPart = localPart[0] + "******";
    return `${maskedLocalPart}@${domain}`;
  };

  useEffect(() => {
    if (userData?.email) {
      setEmail(userData.email);
    }
  }, [userData]); // Update when userData changes

  const maskPhoneNumber = (phoneNumber) => {
    const strNumber = phoneNumber.toString();
    return "******" + strNumber.slice(-4);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setOtp(value);
      setError("");
    }
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

  const handleResendOtp = () => {
    sendEmailToUser(userData);
    setTimeLeft(30);
    setIsDisabled(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    dispatch(setLoader(true));

    try {
      const response = await axios.post(`${API_URLS.VERIFY_OTP_URL}`, {
        email: userData.email,
        otp: otp,
      });

      if (response?.status === 200 && response?.data?.success) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("token", response.data.token); // or set a flag

        console.log("OTP verification successful:", response.data);
        dispatch(setLoader(false));

        navigate("/dashboard");
      } else {
        setError(response?.data?.message || "Invalid TOTP. Please try again.");
      }
    } catch (error) {
      dispatch(setLoader(false));

      console.error(
        "Error during OTP verification:",
        error?.response?.data || error.message
      );
      setError(
        error?.response?.data?.message ||
          "An error occurred during TOTP verification. Please try again."
      );
    }
  };

  return (
    <div className="login-center">
      <h2>Verify your Account</h2>
      <p>
        Enter the 6-digit OTP sent to {maskEmail(email)} or{" "}
        {maskPhoneNumber(phoneNumber)}.
      </p>
      <form onSubmit={handleSubmit}>
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

          <a
            href="#"
            className={`resend-link ${isDisabled ? "disabled" : ""}`}
            onClick={handleResendOtp}
          >
            Resend OTP
          </a>
        </div>
        <div className="login-center-options">
          <div className="error-div">{error}</div>
        </div>
        <div className="login-center-buttons">
          <button className="opt-button" type="submit">
            Verify
          </button>
          <button
            className="opt-buttons"
            type="button"
            onClick={() => navigate("/")}
          >
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default Otp;
