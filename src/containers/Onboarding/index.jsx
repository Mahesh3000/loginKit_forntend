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
import Loading from "../Loading";
// import { setEmail } from "../../redux/actions"; // Assuming you have actions to set user data

const Onboarding = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [generateQr, setGenerateQr] = useState(false);
  const userData = useSelector((state) => state?.auth?.userData);
  const loader = useSelector((state) => state?.auth?.loader);

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
        (userData.totp_enabled === true && userData.otp_enabled === false) ||
        (userData.totp_enabled === true && userData.otp_enabled === true)
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
  }, [userData]);

  return (
    <div className="login-main">
      {loader && <Loading />}

      <LeftSideContainer />
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={Logo} alt="Logo" />
          </div>
          {step === 1 && (
            <Otp userData={userData} sendEmailToUser={sendEmailToUser} />
          )}
          {step === 2 && (
            <Totp
              generateQr={generateQr}
              setGenerateQr={setGenerateQr}
              setIsFirstTime={setIsFirstTime}
              isFirstTime={isFirstTime}
              userData={userData}
              fetchQrCode={fetchQrCode}
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
