import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  Stack,
} from "@mui/material";
import ProfileModal from "./ProfileModal";

const Header = ({ user }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo / Title */}
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Login Kit
          </Typography>

          {/* Nav Items */}
          <Stack direction="row" spacing={4}>
            <Typography
              variant="button"
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </Typography>
            <Typography
              variant="button"
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/orders")}
            >
              Orders
            </Typography>
          </Stack>

          {/* Profile */}
          <IconButton onClick={openModal}>
            <Avatar alt="User" src="/profile.png" />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Profile Modal */}
      <ProfileModal isOpen={isModalOpen} onClose={closeModal} user={user} />
    </>
  );
};

export default Header;
