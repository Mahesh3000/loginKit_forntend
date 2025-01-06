import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import LeftSideContainer from "../Login/LeftSideContainer";
import Otp from "./Otp";
import NotFound from "../Login/NotFound";
import Totp from "./Totp";

const Onboarding = () => {
  const [step, setStep] = useState(2);
  return (
    <div className="login-main">
      <LeftSideContainer />
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={Logo} alt="" />
          </div>
          {step === 1 ? <Otp /> : step === 2 ? <Totp /> : <NotFound />}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
