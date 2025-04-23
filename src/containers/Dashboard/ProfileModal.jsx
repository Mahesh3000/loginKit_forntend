import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Avatar,
  Switch,
  Paper,
  TextField,
} from "@mui/material";
import axios from "axios";
import { API_URLS } from "../constants";

const modalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  height: "80%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  display: "flex",
  overflow: "hidden",
};

const ProfileModal = ({ isOpen, onClose, addMFA, setAddMFA }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
  const [isTOTPEnabled, setIsTOTPEnabled] = useState(false);
  const [isOTPEnabled, setIsOTPEnabled] = useState(false);
  const [mfaCode, setMfaCode] = useState("");
  // const [addMFA, setAddMFA] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [qrCodeImg, setQrCodeImg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsed = JSON.parse(userData);
      setUserDetails(parsed.user);
      setIsTOTPEnabled(parsed.user.totp_enabled);
      setIsOTPEnabled(parsed.user.otp_enabled);
    }
  }, []);

  const handleOtpSwitch = async () => {
    const toggled = !isOTPEnabled;
    setIsOTPEnabled(toggled);
    await axios.post(API_URLS.TOGGLE_OTP, {
      identifier: userDetails.username,
      enable: toggled,
    });
  };

  const handleTotp = (e) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      setMfaCode(value);
      if (errorMsg) setErrorMsg("");
    }
  };

  const handleTotpSwitch = async () => {
    if (!isTOTPEnabled) return;
    await axios.post(API_URLS.TOGGLE_TOTP, {
      identifier: userDetails.username,
      enable: false,
    });
    setIsTOTPEnabled(false);
  };

  const fetchQRCode = async () => {
    setShowQR(true);
    const res = await axios.post(API_URLS.GENERATE_QR_URL, {
      username: userDetails.username,
    });
    if (res?.data?.qrCode) setQrCodeImg(res.data.qrCode);
  };

  const verifyMfaCode = async () => {
    if (mfaCode.length !== 6) {
      setErrorMsg("Please enter a valid 6-digit code.");
      return;
    }

    try {
      const res = await axios.post(API_URLS.VERIFY_TOTP_URL, {
        identifier: userDetails.username,
        code: mfaCode,
      });

      if (res.data.success) {
        await axios.post(API_URLS.TOGGLE_TOTP, {
          identifier: userDetails.username,
          enable: true,
        });
        setIsTOTPEnabled(true);
        setErrorMsg(""); // Clear errors on success
      } else {
        setErrorMsg(res?.data?.message || "Verification failed. Try again.");
      }
    } catch (error) {
      const err =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      setErrorMsg(err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  if (!isOpen) return null;

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={modalStyles} onClick={(e) => e.stopPropagation()}>
        <Button
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            fontSize: 22,
            fontWeight: "bold",
            minWidth: "unset",
            padding: "0 8px",
            lineHeight: 1,
            zIndex: 10,
          }}
        >
          ×
        </Button>
        {/* Left Panel */}
        <Box sx={{ width: 250, bgcolor: "#1e1e1e", color: "#fff", p: 2 }}>
          <Box textAlign="center">
            <Avatar sx={{ width: 70, height: 70, margin: "0 auto" }} />
            <Typography mt={1} fontWeight="bold">
              {userDetails?.username}
            </Typography>
          </Box>
          <Box mt={4}>
            <Button
              fullWidth
              variant={activeTab === "home" ? "contained" : "text"}
              onClick={() => setActiveTab("home")}
            >
              Home
            </Button>
            <Button
              fullWidth
              variant={activeTab === "settings" ? "contained" : "text"}
              onClick={() => setActiveTab("settings")}
              sx={{ mt: 1 }}
            >
              Settings
            </Button>
          </Box>
          <Button
            fullWidth
            onClick={handleLogout}
            sx={{ mt: 10, color: "#f00" }}
          >
            Logout
          </Button>
        </Box>

        {/* Right Content */}
        <Box sx={{ flexGrow: 1, p: 3, overflowY: "auto" }}>
          {activeTab === "home" && (
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">
                Full Name: {userDetails?.username}
              </Typography>
              <Typography>Email: {userDetails?.email}</Typography>
              <Typography>Phone: {userDetails?.phone}</Typography>
              <Typography>Address: {userDetails?.address}</Typography>
            </Paper>
          )}

          {activeTab === "settings" && (
            <Box>
              <Typography variant="h6" mb={2}>
                Settings
              </Typography>

              <Box display="flex" alignItems="center" mb={2}>
                <Typography flex={1}>OTP Authentication</Typography>
                <Switch checked={isOTPEnabled} onChange={handleOtpSwitch} />
              </Box>

              <Box display="flex" alignItems="center" mb={2}>
                <Typography flex={1}>TOTP Authentication</Typography>
                <Switch checked={isTOTPEnabled} onChange={handleTotpSwitch} />
                {!isTOTPEnabled &&
                  (addMFA ? (
                    <Button onClick={() => setAddMFA(false)}>Cancel</Button>
                  ) : (
                    <Button onClick={() => setAddMFA(true)}>Add MFA</Button>
                  ))}
              </Box>

              {/* MFA Setup */}
              {!isTOTPEnabled && addMFA && (
                <Paper sx={{ p: 3, mt: 2 }}>
                  <Typography>Step 1: Install Google Authenticator</Typography>
                  <Typography mt={2}>Step 2: Scan the QR Code</Typography>

                  {!showQR ? (
                    <Button onClick={fetchQRCode} sx={{ mt: 2 }}>
                      Show QR Code
                    </Button>
                  ) : (
                    <Box sx={{ mt: 2 }}>
                      <img src={qrCodeImg} alt="QR Code" width="200" />
                    </Box>
                  )}

                  <Typography mt={3}>Step 3: Enter 6-digit code</Typography>
                  <Box mt={1}>
                    <TextField
                      label="TOTP Code"
                      value={mfaCode}
                      onChange={handleTotp}
                      size="small"
                    />

                    <Button
                      onClick={verifyMfaCode}
                      sx={{ ml: 2 }}
                      variant="contained"
                    >
                      Verify
                    </Button>
                    {errorMsg && (
                      <Typography color="error" variant="body2" mt={1}>
                        {errorMsg}
                      </Typography>
                    )}
                  </Box>
                </Paper>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default ProfileModal;
