import React from "react";
import Button from "@mui/material/Button";             // ✅ MUI v5 component
import IconButton from "@mui/material/IconButton";     // ✅ MUI v5 component
import MenuIcon from "@mui/icons-material/Menu";       // ✅ MUI v5 icon
import logo from "../../Image/logo.png";               // Import the logo image

import { Link } from "react-router-dom";

const Navbar = ({ toggleHandler }) => {
  return (
    <nav
      sx={{
        display: "flex",
        justifyContent: "space-between",
        zIndex: 999,
        background: "#ffffff",
        width: "100%",
        boxShadow:
          "1px 1px 2px rgba(0, 0, 0, 0.1), 2px 2px 4px rgba(0, 0, 0, 0.2), 4px 4px 8px rgba(0, 0, 0, 0.3)",
        flexDirection: { xs: "row", md: "row" },
        alignItems: { xs: "center", md: "center" },
        padding: { xs: "1rem", md: "1rem" },
      }}
    >
      <IconButton
        sx={{
          display: { xs: "block", md: "none" },
          fontSize: "2rem",
          "& svg": {
            fontSize: "2rem",
            "&:hover": {
              color: "#ed1c24",
            },
          },
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
        onClick={toggleHandler}
      >
        <MenuIcon fontSize="2rem" />
      </IconButton>
      <div
        sx={{
          fontSize: { xs: "1.8rem", md: "2rem", sm: "1.8rem" },
          fontWeight: 900,
          color: "black",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
          marginBottom: { xs: "0", md: "0", sm: "0.5rem" },
          marginRight: { xs: "1.5rem", md: "0", sm: "0" },
        }}
      >
        <Link
          to="/admin/dashboard"
          style={{ textDecoration: "none", color: "none", width: "100%", height: "100%" }}
        >
          <img
            src={logo}
            alt="logo"
            style={{
              height: "3.5rem",
              alignSelf: "center",
              paddingLeft: "25px",
              "& img": {
                height: "100%",
                width: "auto",
              },
            }}
          />
        </Link>
      </div>
      <Link
        to="/contact"
        style={{ textDecoration: "none", color: "none" }}
      >
        <Button
          sx={{
            padding: "10px 30px",
            borderRadius: "20px",
            boxShadow: "0px 2px 8px 0px #0000000a",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: { xs: "14px", md: "16px", sm: "14px" },
            color: "#fff",
            letterSpacing: "1px",
            background: "#414141",
            transition: "background-color 0.3s",
            marginRight: "2rem",
            display: { xs: "none", md: "inline-flex" },
            "&:hover": {
              background: "#ed1c24",
            },
          }}
        >
          Contact Us
        </Button>
      </Link>
    </nav>
  );
};

export default Navbar;
