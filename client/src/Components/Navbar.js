import React, { useState, useEffect } from "react";
// import "./Navbar.css";
import Search from "./Search";
import { Link } from "react-router-dom";

// Import packages
import styled from "styled-components";

const StyledUl = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

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
      {/*<Search searchValue={""} />*/}
      <StyledUl>
        <Link
          to="/restaurants"
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
        <Link
          to="/pending"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <li>Pending</li>
        </Link>
        <Link to="/wallet" style={{ textDecoration: "none", color: "inherit" }}>
          <li>Wallet</li>
        </Link>

        <Link
          to={isSignedIn ? "/mypage" : "/signin"}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <li>My Page</li>
        </Link>
      </StyledUl>
    </div>
  );
};

export default Navbar;
