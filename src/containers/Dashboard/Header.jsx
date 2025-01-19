import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";

const Header = ({ user }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleLogout = () => {
    localStorage.removeItem(user?.username);
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-logo">Login Kit</div>
      <nav className="header-nav">
        <ul>
          <li onClick={() => navigate("/dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/orders")}>Orders</li>
        </ul>
      </nav>
      <div className="header-profile" onClick={toggleModal}>
        <img
          src="https://via.placeholder.com/40" // Replace with actual profile image URL
          alt="User Profile"
          className="profile-image"
        />
        {isModalOpen && (
          <ProfileModal onClose={toggleModal} onLogout={handleLogout} />
        )}
      </div>
    </header>
  );
};

export default Header;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ProfileModal from "./ProfileModal";
// // import { clearAuth } from "../redux";
// import { useDispatch } from "react-redux";

// const Header = ({ user }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const toggleModal = () => setIsModalOpen(!isModalOpen);

//   const handleLogout = () => {
//     // dispatch(clearAuth()); // Uncomment this line if using Redux
//     localStorage.removeItem(user?.username);
//     localStorage.removeItem("authToken");
//     navigate("/");
//   };

//   return (
//     <header className="header">
//       <div className="header-icon">
//         <i className="fas fa-user"></i>{" "}
//       </div>
//       <div className="header-logo">Login Kit</div>
//       <nav className="header-nav">
//         <ul>
//           <li className="hover_text" onClick={() => navigate("/dashboard")}>
//             Dashboard
//           </li>
//           <li className="hover_text" onClick={() => navigate("/Orders")}>
//             Orders
//           </li>
//         </ul>
//       </nav>
//       <div className="relative">
//         <img
//           src="https://via.placeholder.com/40" // Replace with user's profile image URL
//           alt="User Profile"
//           className="header-profile rounded-full cursor-pointer"
//           onClick={toggleModal}
//         />
//         {/* Render Modal */}
//         {isModalOpen && (
//           <ProfileModal onClose={toggleModal} onLogout={handleLogout} />
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;

// // import React from "react";
// // import { useNavigate } from "react-router-dom";
// // // import { clearAuth } from "../redux";
// // // import { useDispatch } from "react-redux";

// // const Header = ({ user }) => {
// //   const navigate = useNavigate();
// //   //   const dispatch = useDispatch();
// //   const handleLogout = () => {
// //     dispatch(clearAuth());
// //     localStorage.removeItem(user?.username);
// //     localStorage.removeItem("authToken");
// //     navigate("/");
// //   };

// //   return (
// //     <header className="header">
// //       <div className="header-icon">
// //         <i className="fas fa-user"></i>{" "}
// //       </div>
// //       <div className="header-logo">Login Kit</div>
// //       <nav className="header-nav">
// //         <ul>
// //           <li className="hover_text" onClick={() => navigate("/dashboard")}>
// //             Dashboard
// //           </li>
// //           <li className="hover_text" onClick={() => navigate("/Orders")}>
// //             Orders
// //           </li>
// //         </ul>
// //       </nav>
// //       <button className="header-logout" onClick={handleLogout}>
// //         Logout
// //       </button>
// //     </header>
// //   );
// // };

// // export default Header;
