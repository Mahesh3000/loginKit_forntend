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

const ProfileModal = ({ isOpen, onClose }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
  const [isTOTPEnabled, setIsTOTPEnabled] = useState(false);
  const [isOTPEnabled, setIsOTPEnabled] = useState(false);
  const [mfaCode, setMfaCode] = useState("");
  const [addMFA, setAddMFA] = useState(false);
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

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { API_URLS } from "../constants";
// import axios from "axios";
// import { setUserData } from "../../redux";
// import { useDispatch } from "react-redux";

// const ProfileModal = ({ isOpen, onClose, user }) => {
//   const dispatch = useDispatch();
//   const [activeTab, setActiveTab] = useState("home");
//   const [generateQr, setGenerateQr] = useState(false);
//   const [addMFA, setAddMFA] = useState(false);
//   const [showQrCode, setShowQrCode] = useState(false);
//   const [mfaCode1, setMfaCode1] = useState();
//   const [error, setError] = useState("");
//   const [userDetails, setUserDetails] = useState(null);
//   const [isTOTPEnabled, setIsTOTPEnabled] = useState(null);
//   const [isOTPEnabled, setIsOTPEnabled] = useState(null);

//   useEffect(() => {
//     const storedUserDetails = localStorage.getItem("user");
//     if (storedUserDetails) {
//       const parsedUserDetails = JSON.parse(storedUserDetails);
//       setUserDetails(parsedUserDetails?.user);
//     }
//   }, []);

//   useEffect(() => {
//     if (userDetails) {
//       setIsTOTPEnabled(userDetails.totp_enabled);
//       setIsOTPEnabled(userDetails.otp_enabled);
//     }
//   }, [userDetails]);

//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token"); // Clear authentication token
//     localStorage.removeItem("user"); // Clear user data (if saved)
//     navigate("/"); // Redirect to home or login page
//   };

//   const fetchQrCode = async () => {
//     setShowQrCode(true);
//     try {
//       const response = await axios.post(`${API_URLS.GENERATE_QR_URL}`, {
//         username: userDetails.username,
//       });
//       if (response?.status === 200 && response?.data?.success) {
//         setGenerateQr(response?.data?.qrCode);
//       } else {
//         console.error("Failed to generate QR Code:", response?.data?.message);
//       }
//     } catch (error) {
//       console.error("Error while generating QR Code:", error?.message);
//     }
//   };
//   // Handle profile image upload
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfileImage(reader.result); // Set the profile image preview
//       };
//       reader.readAsDataURL(file); // Read the file as a data URL for preview
//     }
//   };

//   const handleOtpSwitch = async () => {
//     try {
//       const newOtpStatus = !isOTPEnabled; // Toggle the value directly

//       // Use functional setState to get the latest state value
//       setIsOTPEnabled((prevState) => {
//         return newOtpStatus;
//       });

//       const response = await axios.post(`${API_URLS.TOGGLE_OTP}`, {
//         identifier: userDetails.username,
//         enable: newOtpStatus, // Use the toggled value directly in the API request
//       });

//       if (response?.status === 200 && response?.data?.success) {
//         console.log("successfully toggled");
//       } else {
//         console.error("Failed to generate QR Code:", response?.data?.message);
//       }
//     } catch (error) {
//       console.error("Error while generating QR Code:", error?.message);
//     }
//   };

//   const handleTOTPSwitch = async () => {
//     if (!isTOTPEnabled) {
//       console.warn("TOTP can only be enabled after verification.");
//       return; // Prevent enabling directly
//     }

//     try {
//       const response = await axios.post(`${API_URLS.TOGGLE_TOTP}`, {
//         identifier: userDetails.username,
//         enable: false, // Only allow disabling
//       });

//       if (response?.status === 200 && response?.data?.success) {
//         console.log("Successfully disabled TOTP");

//         // Functional update to ensure latest state
//         setIsTOTPEnabled((prev) => false);
//       } else {
//         console.error("Failed to disable TOTP:", response?.data?.message);
//       }
//     } catch (error) {
//       console.error("Error while disabling TOTP:", error?.message);
//     }
//   };

//   const verifyMfaCode = async () => {
//     if (mfaCode1.length !== 6) {
//       setError("Please enter a valid 6-digit OTP.");
//       return;
//     }

//     setError("");
//     try {
//       if (userDetails) {
//         const response = await axios.post(`${API_URLS.VERIFY_TOTP_URL}`, {
//           identifier: userDetails.username,
//           code: mfaCode1,
//         });

//         if (response?.status === 200 && response?.data?.success) {
//           console.log("TOTP verification successful:", response.data);

//           // Call API to enable TOTP only after successful verification
//           await axios.post(`${API_URLS.TOGGLE_TOTP}`, {
//             identifier: userDetails.username,
//             enable: true, // Enable TOTP after verification
//           });

//           // Functional state update
//           setIsTOTPEnabled((prev) => true);
//         } else {
//           setError(
//             response?.data?.message || "Invalid TOTP. Please try again."
//           );
//         }
//       }
//     } catch (error) {
//       console.error("Error during TOTP verification:", error?.response?.data);
//       setError(
//         error?.response?.data?.message ||
//           "An error occurred during TOTP verification. Please try again."
//       );
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div
//       className="fixed inset-0 flex items-center justify-center bg-transparent"
//       onClick={onClose}
//     >
//       <div
//         className="relative flex w-2/5 h-2/3 bg-gray-100 shadow-lg rounded-lg overflow-hidden"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Modal Header */}
//         <div className="mb-11 absolute top-0 left-0 w-full flex justify-between items-center bg-gray-800 text-white py-3 px-4 z-10">
//           <h2 className="text-lg font-semibold">User Profile</h2>
//           <button
//             className="text-white text-2xl hover:text-gray-300"
//             onClick={onClose}
//           >
//             &times;
//           </button>
//         </div>

//         {/* Sidebar */}
//         <div className="w-72 bg-gray-900 text-white p-6 flex flex-col mt-0.5">
//           <div className="flex flex-col items-center mb-6">
//             <img
//               src="profile-photo-url"
//               alt="Profile"
//               className="w-20 h-20 rounded-full border-2 border-gray-500"
//             />
//             <h3 className="mt-3 text-xl font-semibold">
//               {userDetails?.username || "Guest User"}
//             </h3>
//           </div>

//           {/* <nav className="flex flex-col space-y-2">
//             <button
//               onClick={() => setActiveTab("home")}
//               className={`px-6 py-3 text-lg font-semibold text-left h-14 ${
//                 activeTab === "home"
//                   ? "border-l-4 border-blue-600 text-blue-600 bg-gray-200"
//                   : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
//               }`}
//             >
//               Home
//             </button>
//             <button
//               onClick={() => setActiveTab("settings")}
//               className={`px-6 py-3 text-lg font-semibold text-left h-14 ${
//                 activeTab === "settings"
//                   ? "border-l-4 border-blue-600 text-blue-600 bg-gray-200"
//                   : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
//               }`}
//             >
//               Settings
//             </button>
//           </nav> */}
//           <nav className="flex flex-col space-y-2">
//             <button
//               onClick={() => setActiveTab("home")}
//               className={`px-6 py-3 text-lg font-semibold text-left h-14 ${
//                 activeTab === "home"
//                   ? "border-l-4 border-blue-600 text-blue-600 bg-gray-200"
//                   : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
//               }`}
//             >
//               Home
//             </button>
//             {userDetails && userDetails?.username && (
//               <button
//                 onClick={() => setActiveTab("settings")}
//                 className={`px-6 py-3 text-lg font-semibold text-left h-14 ${
//                   activeTab === "settings"
//                     ? "border-l-4 border-blue-600 text-blue-600 bg-gray-200"
//                     : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
//                 }`}
//               >
//                 Settings
//               </button>
//             )}
//           </nav>

//           <button
//             className="px-6 py-3 text-lg font-semibold text-left mt-6 h-14 w-full text-gray-600 bg-gray py-2 rounded hover:bg-gray-100"
//             onClick={handleLogout}
//           >
//             Sign Out
//           </button>
//         </div>

//         {/* Content Section */}
//         <div className="flex-1 p-6 mt-0.5">
//           {activeTab === "home" && userDetails && (
//             <div>
//               <h2 className="text-2xl font-bold">About</h2>
//               <div className="mt-4 bg-gray-100 p-4 rounded-lg">
//                 <p className="mb-2">
//                   <strong>Full Name:</strong> {userDetails?.username}
//                 </p>
//                 <p className="mb-2">
//                   <strong>Email:</strong> {userDetails?.email}
//                 </p>
//                 <p className="mb-2">
//                   <strong>Phone:</strong> {userDetails?.phone}
//                 </p>
//                 <p className="mb-2">
//                   <strong>Address:</strong> {userDetails?.address}
//                 </p>
//               </div>

//               <h2 className="text-2xl font-bold mt-6">Recent Projects</h2>
//               <div className="mt-4 bg-gray-100 p-4 rounded-lg">
//                 <p>
//                   <strong>Project Name:</strong> {userDetails?.projectName}
//                 </p>
//                 <p>
//                   <strong>Project Description:</strong>{" "}
//                   {userDetails?.projectDescription}
//                 </p>
//               </div>
//             </div>
//           )}

//           {activeTab === "settings" && (
//             <div className="h-[700px] overflow-hidden">
//               <div className="max-h-[600px] overflow-y-auto p-4 bg-white shadow-md rounded-lg">
//                 <h2 className="text-2xl font-bold">Settings</h2>
//                 <p className="mt-4 text-gray-700">
//                   Manage your account settings here.
//                 </p>

//                 <div className="mt-6">
//                   {/* OTP Toggle */}
//                   <div className="flex items-center mb-4">
//                     <span className="text-lg font-semibold mr-4">
//                       OTP Authentication
//                     </span>
//                     <label className="switch">
//                       <input
//                         type="checkbox"
//                         checked={isOTPEnabled}
//                         onChange={handleOtpSwitch}
//                       />
//                       <span className="slider round"></span>
//                     </label>
//                   </div>

//                   {/* TOTP Toggle */}
//                   <div className="flex items-center mb-4">
//                     <span className="text-lg font-semibold mr-4">
//                       TOTP Authentication
//                     </span>
//                     <label className="switch mr-4">
//                       <input
//                         type="checkbox"
//                         checked={isTOTPEnabled}
//                         onChange={handleTOTPSwitch}
//                       />
//                       <span className="slider round"></span>
//                     </label>

//                     {!isTOTPEnabled &&
//                       (addMFA ? (
//                         <button
//                           onClick={() => {
//                             setAddMFA(false);
//                             setShowQrCode(false);
//                             setMfaCode1("");
//                           }}
//                           className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
//                         >
//                           Cancel
//                         </button>
//                       ) : (
//                         <button
//                           onClick={() => setAddMFA(true)}
//                           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//                         >
//                           Add MFA
//                         </button>
//                       ))}
//                   </div>

//                   {/* MFA Setup Section */}
//                   {!isTOTPEnabled && addMFA && (
//                     <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
//                       <h2 className="text-2xl font-semibold">
//                         Set up device Info
//                       </h2>
//                       <p className="mt-4 text-gray-700">
//                         <strong>Authenticator app</strong>
//                         <br />A virtual MFA device is an application running on
//                         your device that you can configure by scanning a QR
//                         code.
//                       </p>

//                       {/* Step 1 */}
//                       <div className="mt-6">
//                         <h3 className="text-lg font-semibold">Step 1</h3>
//                         <p className="mt-2">
//                           Install a compatible application such as Google
//                           Authenticator, Duo Mobile, or Authy app on your mobile
//                           device or computer.
//                         </p>
//                       </div>

//                       {/* Step 2 */}
//                       <div className="mt-6">
//                         <h3 className="text-lg font-semibold">Step 2</h3>
//                         <p className="mt-2">
//                           Open your authenticator app, choose{" "}
//                           <strong>"Show QR code"</strong> on this page, then use
//                           the app to scan the code. Alternatively, you can type
//                           a secret key.
//                         </p>

//                         <div className="mt-4 flex items-center space-x-4 justify-center">
//                           {showQrCode ? (
//                             <div className="bg-white p-4 border rounded-lg flex">
//                               <img
//                                 src={generateQr}
//                                 alt="QR Code"
//                                 className="w-50 h-50"
//                               />
//                             </div>
//                           ) : (
//                             <button
//                               onClick={fetchQrCode}
//                               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//                             >
//                               Show QR code
//                             </button>
//                           )}
//                         </div>
//                       </div>

//                       {/* Step 3 */}
//                       <form
//                         className="mt-6"
//                         onSubmit={(e) => {
//                           e.preventDefault();
//                           verifyMfaCode();
//                         }}
//                       >
//                         <h3 className="text-lg font-semibold">Step 3</h3>
//                         <p className="mt-2">
//                           Enter two consecutive MFA codes below.
//                         </p>

//                         <div className="mt-4 grid grid-cols-2 gap-4">
//                           <input
//                             type="text"
//                             placeholder="First 6-digit code"
//                             className="w-full p-3 border rounded-lg"
//                             value={mfaCode1}
//                             onChange={(e) => setMfaCode1(e.target.value)}
//                             required
//                           />
//                         </div>

//                         <button
//                           type="submit"
//                           className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
//                         >
//                           Verify MFA Code
//                         </button>
//                       </form>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileModal;
