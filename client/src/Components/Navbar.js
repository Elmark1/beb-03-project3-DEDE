import React, { useState, useEffect } from "react";
// import "./Navbar.css";
import Search from "./Search";
import { Link } from "react-router-dom";

const Navbar = ({ isSignedIn }) => {
  return (
    <div className="navbar FlexRowreact">
      <Link
        to="/"
        style={{ textDecoration: "none", color: "inherit" }}
        className="to-home"
      >
        <span className="navbar-title">Decentralised Delivery</span>
      </Link>
      <Search searchValue={""} />
      <ul className="link">
        <Link
          to="/restaurant"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <li>Restaurant</li>
        </Link>
        <Link
          to="/history"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <li>History</li>
        </Link>

        <Link to="/wallet" style={{ textDecoration: "none", color: "inherit" }}>
          <li>Wallet</li>
        </Link>

        <Link to="/mypage" style={{ textDecoration: "none", color: "inherit" }}>
          <li>My Page</li>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
