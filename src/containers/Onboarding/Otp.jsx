import React, { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URLS } from "../constants";

const Otp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [isDisabled, setIsDisabled] = useState(true);
  const [email, setEmail] = useState("mahdskjhkjkj@gmail.com");
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

  const handleResendOtp = () => {
    console.log("kjdshfj");
  };

  const handleSubmit = async () => {
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }
    navigate("/dashboard");

    console.log("otp", otp);

    setError("");
    // try {
    //   if (userData) {
    //     const response = await axios.post(`${API_URLS.VERIFY_OTP_URL}`, {
    //       identifier: userData.username,
    //       code: otp,
    //     });

    //     if (response?.status === 200 && response?.data?.success) {
    //       console.log("TOTP verification successful:", response.data);
    //       navigate("/dashboard");
    //     } else {
    //       setError(
    //         response?.data?.message || "Invalid TOTP. Please try again."
    //       );
    //     }
    //   }
    // } catch (error) {
    //   console.error("Error during TOTP verification:", error?.response?.data);
    //   setError(
    //     error?.response?.data?.message ||
    //       "An error occurred during TOTP verification. Please try again."
    //   );
    // }
  };
  return (
    <div className="login-center">
      <h2>Verify your Account</h2>
      <p>
        Enter the 6-digit OTP sent to {maskEmail(email)} or{" "}
        {maskPhoneNumber(phoneNumber)}.
      </p>
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
          <button type="button" onClick={handleSubmit}>
            Verify
          </button>
          <button type="button" onClick={() => navigate("/")}>
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default Otp;
