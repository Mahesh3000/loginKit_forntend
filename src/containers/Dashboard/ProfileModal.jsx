import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URLS } from "../constants";
import axios from "axios";

const ProfileModal = ({ isOpen, onClose, user }) => {
  const [isTOTPEnabled, setIsTOTPEnabled] = useState(false);
  const [isOTPEnabled, setIsOTPEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [generateQr, setGenerateQr] = useState(false);
  const [addMFA, setAddMFA] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const [mfaCode1, setMfaCode1] = useState();
  const [error, setError] = useState("");

  const userData = {
    fullName: "Burk Macklin",
    email: "abc@gmail.com",
    phone: "0092346874656",
    address: "Street No. 4, XYZ",
    projectName: "Project ABC",
    projectDescription: "This is a sample project description.",
  };

  useEffect(() => {
    if (showQrCode) {
      // fetchQrCode();
    }
  });

  const navigate = useNavigate();

  console.log("user", user);

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear authentication token
    localStorage.removeItem(user?.username); // Clear user data (if saved)
    navigate("/"); // Redirect to home or login page
  };

  const fetchQrCode = async () => {
    setShowQrCode(true);
    try {
      const response = await axios.post(`${API_URLS.GENERATE_QR_URL}`, {
        username: "mahes2shjs",
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
  // Handle profile image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Set the profile image preview
      };
      reader.readAsDataURL(file); // Read the file as a data URL for preview
    }
  };
  const verifyMfaCode = async () => {
    if (mfaCode1.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }
    // console.log("totp", totp);

    setError("");
    try {
      if (userData) {
        const response = await axios.post(`${API_URLS.VERIFY_TOTP_URL}`, {
          identifier: "mahes2shjs",
          code: mfaCode1,
        });

        if (response?.status === 200 && response?.data?.success) {
          console.log("TOTP verification successful:", response.data);
          // navigate("/dashboard");
          // alert("TOTP verification successful:");
          setIsTOTPEnabled(true);
        } else {
          setError(
            response?.data?.message || "Invalid TOTP. Please try again."
          );
        }
      }
    } catch (error) {
      console.error("Error during TOTP verification:", error?.response?.data);
      setError(
        error?.response?.data?.message ||
          "An error occurred during TOTP verification. Please try again."
      );
    }
  };
  const handleOtpSwitch = async () => {
    try {
      const newOtpStatus = !isOTPEnabled; // Toggle the value directly

      // Use functional setState to get the latest state value
      setIsOTPEnabled((prevState) => {
        return newOtpStatus;
      });

      const response = await axios.post(`${API_URLS.TOGGLE_OTP}`, {
        identifier: user.username,
        enable: newOtpStatus, // Use the toggled value directly in the API request
      });

      if (response?.status === 200 && response?.data?.success) {
        console.log("successfully toggled");
      } else {
        console.error("Failed to generate QR Code:", response?.data?.message);
      }
    } catch (error) {
      console.error("Error while generating QR Code:", error?.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-transparent"
      onClick={onClose}
    >
      <div
        className="relative flex w-2/5 h-2/3 bg-gray-100 shadow-lg rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="mb-11 absolute top-0 left-0 w-full flex justify-between items-center bg-gray-800 text-white py-3 px-4 z-10">
          <h2 className="text-lg font-semibold">User Profile</h2>
          <button
            className="text-white text-2xl hover:text-gray-300"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        {/* Sidebar */}
        <div className="w-72 bg-gray-900 text-white p-6 flex flex-col mt-0.5">
          <div className="flex flex-col items-center mb-6">
            <img
              src="profile-photo-url"
              alt="Profile"
              className="w-20 h-20 rounded-full border-2 border-gray-500"
            />
            <h3 className="mt-3 text-xl font-semibold">{userData.fullName}</h3>
          </div>

          <nav className="flex flex-col space-y-2">
            <button
              onClick={() => setActiveTab("home")}
              className={`px-6 py-3 text-lg font-semibold text-left h-14 ${
                activeTab === "home"
                  ? "border-l-4 border-blue-600 text-blue-600 bg-gray-200"
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`px-6 py-3 text-lg font-semibold text-left h-14 ${
                activeTab === "settings"
                  ? "border-l-4 border-blue-600 text-blue-600 bg-gray-200"
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
              }`}
            >
              Settings
            </button>
          </nav>

          <button
            className="px-6 py-3 text-lg font-semibold text-left mt-6 h-14 w-full text-gray-600 bg-gray py-2 rounded hover:bg-gray-100"
            onClick={handleLogout}
          >
            Sign Out
          </button>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 mt-0.5">
          {activeTab === "home" && (
            <div>
              <h2 className="text-2xl font-bold">About</h2>
              <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                <p className="mb-2">
                  <strong>Full Name:</strong> {userData.fullName}
                </p>
                <p className="mb-2">
                  <strong>Email:</strong> {userData.email}
                </p>
                <p className="mb-2">
                  <strong>Phone:</strong> {userData.phone}
                </p>
                <p className="mb-2">
                  <strong>Address:</strong> {userData.address}
                </p>
              </div>

              <h2 className="text-2xl font-bold mt-6">Recent Projects</h2>
              <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                <p>
                  <strong>Project Name:</strong> {userData.projectName}
                </p>
                <p>
                  <strong>Project Description:</strong>{" "}
                  {userData.projectDescription}
                </p>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="h-[700px] overflow-hidden">
              <div className="max-h-[600px] overflow-y-auto p-4 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold">Settings</h2>
                <p className="mt-4 text-gray-700">
                  Manage your account settings here.
                </p>

                <div className="mt-6">
                  {/* OTP Toggle */}
                  <div className="flex items-center mb-4">
                    <span className="text-lg font-semibold mr-4">
                      OTP Authentication
                    </span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={isOTPEnabled}
                        onChange={handleOtpSwitch}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>

                  {/* TOTP Toggle */}
                  <div className="flex items-center mb-4">
                    <span className="text-lg font-semibold mr-4">
                      TOTP Authentication
                    </span>
                    <label className="switch mr-4">
                      <input
                        type="checkbox"
                        checked={isTOTPEnabled}
                        onChange={() => {
                          if (isTOTPEnabled) {
                            setIsTOTPEnabled(false);
                          }
                        }}
                      />
                      <span className="slider round"></span>
                    </label>

                    {!isTOTPEnabled &&
                      (addMFA ? (
                        <button
                          onClick={() => {
                            setAddMFA(false);
                            setShowQrCode(false);
                            setMfaCode1("");
                          }}
                          className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      ) : (
                        <button
                          onClick={() => setAddMFA(true)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                          Add MFA
                        </button>
                      ))}
                  </div>

                  {/* MFA Setup Section */}
                  {!isTOTPEnabled && addMFA && (
                    <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
                      <h2 className="text-2xl font-semibold">
                        Set up device Info
                      </h2>
                      <p className="mt-4 text-gray-700">
                        <strong>Authenticator app</strong>
                        <br />A virtual MFA device is an application running on
                        your device that you can configure by scanning a QR
                        code.
                      </p>

                      {/* Step 1 */}
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold">Step 1</h3>
                        <p className="mt-2">
                          Install a compatible application such as Google
                          Authenticator, Duo Mobile, or Authy app on your mobile
                          device or computer.
                        </p>
                      </div>

                      {/* Step 2 */}
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold">Step 2</h3>
                        <p className="mt-2">
                          Open your authenticator app, choose{" "}
                          <strong>"Show QR code"</strong> on this page, then use
                          the app to scan the code. Alternatively, you can type
                          a secret key.
                        </p>

                        <div className="mt-4 flex items-center space-x-4 justify-center">
                          {showQrCode ? (
                            <div className="bg-white p-4 border rounded-lg flex">
                              <img
                                src={generateQr}
                                alt="QR Code"
                                className="w-50 h-50"
                              />
                            </div>
                          ) : (
                            <button
                              onClick={fetchQrCode}
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                            >
                              Show QR code
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Step 3 */}
                      <form
                        className="mt-6"
                        onSubmit={(e) => {
                          e.preventDefault();
                          verifyMfaCode();
                        }}
                      >
                        <h3 className="text-lg font-semibold">Step 3</h3>
                        <p className="mt-2">
                          Enter two consecutive MFA codes below.
                        </p>

                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="First 6-digit code"
                            className="w-full p-3 border rounded-lg"
                            value={mfaCode1}
                            onChange={(e) => setMfaCode1(e.target.value)}
                            required
                          />
                        </div>

                        <button
                          type="submit"
                          className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                        >
                          Verify MFA Code
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
