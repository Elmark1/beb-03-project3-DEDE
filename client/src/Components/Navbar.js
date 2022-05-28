import React from "react";
import styled from "styled-components";
import { AiOutlineHistory, AiOutlineWallet } from "react-icons/ai";
import { FaUserCircle, FaScroll } from "react-icons/fa";
import { BiRestaurant } from "react-icons/bi";
import { Link } from "react-router-dom";

const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 25px 30px 15px 30px;
  height: 90px;
  box-shadow: 0px 0.5px 20px rgb(50, 194, 189);
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  .restaurant {
    font-size: 34px;
    color: #00c2bd;
  }

  .history {
    font-size: 34px;
    color: #00c2bd;
  }

  .pending {
    font-size: 34px;
    color: #00c2bd;
  }

  .wallet {
    font-size: 34px;
    color: #00c2bd;
  }

  .user {
    font-size: 34px;
    color: #00c2bd;
  }
`;

const StyledLink = styled(Link)`
  margin: 10px;
`;

const StyledLogo = styled.img`
  height: 80px;
`;

const Navbar = ({ isSignedIn }) => {
  return (
    <StyledNav>
      <StyledLink to="/" className="to-home">
        <StyledLogo src="logoHome.png" />
      </StyledLink>
      {/*<Search searchValue={""} />*/}
      <StyledDiv>
        {isSignedIn ? (
          <>
            <StyledLink to="/restaurants">
              <BiRestaurant className="restaurant" />
            </StyledLink>
            <StyledLink to="/pending">
              <AiOutlineHistory className="pending" />
            </StyledLink>
            <StyledLink to="/history">
              <FaScroll className="history" />
            </StyledLink>
          </>
        ) : (
          <></>
        )}
        <StyledLink to={isSignedIn ? "/mypage" : "/signin"}>
          <FaUserCircle className="user" />
        </StyledLink>
		<StyledLink to={isSignedIn ? "/wallet" : "/signin"}>
          <AiOutlineWallet className="wallet" />
        </StyledLink>
      </StyledDiv>
    </StyledNav>
  );
};

export default Navbar;
