import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";

const Header = ({ user }) => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  console.log("isModalOpen", isModalOpen);

  return (
    <header className="header">
      <div className="header-logo">Login Kit</div>
      <nav className="header-nav">
        <ul>
          <li onClick={() => navigate("/dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/orders")}>Orders</li>
        </ul>
      </nav>
      <div className="header-profile" onClick={openModal}>
        <img
          src="https://via.placeholder.com/40"
          alt="User Profile"
          className="profile-image"
        />

        <ProfileModal isOpen={isModalOpen} onClose={closeModal} user={user} />
      </div>
    </header>
  );
};

export default Header;
