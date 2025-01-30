import React, { memo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import LeftSideContainer from "../Login/LeftSideContainer";
import Otp from "./Otp";
import NotFound from "../Login/NotFound";
import Totp from "./Totp";
import { useSelector, useDispatch } from "react-redux";
import { API_URLS } from "../constants";
import axios from "axios";
// import { setEmail } from "../../redux/actions"; // Assuming you have actions to set user data

const Onboarding = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [generateQr, setGenerateQr] = useState(false);
  const userData = useSelector((state) => state?.auth?.userData);

  const fetchQrCode = async () => {
    try {
      const response = await axios.post(`${API_URLS.GENERATE_QR_URL}`, {
        username: userData?.username,
      });
      if (response?.status === 200 && response?.data?.success) {
        setGenerateQr(response?.data?.qrCode);
      } else {
        console.error("Failed to generate QR Code:", response?.data?.message);
      }
    } catch (error) {
      console.error("Error while generating QR Code:", error?.message);
    }
  };

  const sendEmailToUser = async (user) => {
    console.log("user in sendEmailToUser", user);

    try {
      const response = await axios.post(`${API_URLS.REQUEST_OTP_URL}`, {
        email: user?.email,
      });
      console.log("response", response);

      if (response?.status === 200 && response?.data?.success) {
        // setGenerateQr(response?.data?.qrCode);
      } else {
        console.error("failed to send otp", response?.data?.message);
      }
    } catch (error) {
      console.error("failed to send otp", error?.message);
    }
  };

  useEffect(() => {
    //debugger;
    if (userData) {
      if (
        (userData.totp_enabled === true && userData.otp_enabled === true) ||
        (userData.totp_enabled === true && userData.otp_enabled === false)
      ) {
        setStep(2);
      } else if (
        userData.otp_enabled === true &&
        userData.totp_enabled === false
      ) {
        sendEmailToUser(userData);
        setStep(1);
      } else if (
        userData.totp_enabled === false &&
        userData.otp_enabled === false
      ) {
        navigate("/dashboard"); // If no user data, navigate back to login page
      }
    }
  }, []);

  return (
    <div className="login-main">
      <LeftSideContainer />
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={Logo} alt="Logo" />
          </div>
          {step === 1 && <Otp userData={userData} />}
          {step === 2 && (
            <Totp
              generateQr={generateQr}
              setGenerateQr={setGenerateQr}
              setIsFirstTime={setIsFirstTime}
              isFirstTime={isFirstTime}
              userData={userData}
            />
          )}
          {step === 3 && <NotFound />}{" "}
          {/* Replace with a proper component or redirection */}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;

// useEffect(() => {
//   if (userData) {
//     // If the user is first time, handle step 1
//     if (userData.is_first_time_user) {
//       if (userData.totp_enabled === false && userData.otp_enabled === false) {
//         setIsFirstTime(true);
//         setStep(2);
//         fetchQrCode();
//       }
//     } else {
//       // debugger;
//       if (
//         (userData.totp_enabled === true && userData.otp_enabled === true) ||
//         (userData.totp_enabled === true && userData.otp_enabled === false)
//       ) {
//         setStep(2);
//       } else if (
//         userData.otp_enabled === true &&
//         userData.totp_enabled === false
//       ) {
//         sendEmailToUser(userData);
//         setStep(1);
//       } else if (
//         userData.totp_enabled === false &&
//         userData.otp_enabled === false
//       ) {

//         navigate("/dashboard"); // If no user data, navigate back to login page
//       }
//     }
//   } else {
// navigate("/");
// }
// }, [userData, navigate]);
