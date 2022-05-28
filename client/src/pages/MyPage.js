import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignIn from "./SignIn";
import { Cookies } from "react-cookie";
import styled from "styled-components";

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledH1 = styled.h1`
  margin: 60px 0 15px 0;
`;

const StyledH3 = styled.h3`
  margin: 20px 0 5px 0;
`;

const StyledSection1 = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 100%;
  width: 380px;
  margin-bottom: 20px;
`;

const StyledSection2 = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 23px;
  border-top: 1px solid rgb(0, 194, 189);
`;

const StyledLabel1 = styled.label`
  width: 100%;
  padding-right: 32px;
`;

const StyledLabel2 = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 8px;
  border-top: 1px solid rgb(0, 194, 189);
`;

const StyledButton = styled.button`
  position: absolute;
  top: 105%;
  left: 70%;
  color: white;
  background: #00c2bd;
  padding: 0.375rem 0.75rem;
  border: 1px solid #00c2bd;
  border-radius: 10px;
  width: 10em;
`;

const StyledLink = styled(Link)`
  color: #00c2bd;
  margin: 15px;
`;

const MyPage = ({ setIsSignedIn }) => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const cookieIsSignedIn = cookies.get("isSignedIn");
  const cookieUserType = cookies.get("userType");
  const cookieUserObjectId = cookies.get("userObjectId");
  const cookieSigungu = cookies.get("sigungu");
  const cookieStakedToken = cookies.get("stakedToken");

  const signOutHandler = async () => {
    try {
      await axios.post("/signout");

      cookies.remove("isSignedIn");
      cookies.remove("userType");
      cookies.remove("userObjectId");
      cookies.remove("sigungu");
      cookies.remove("stakedToken");

      setIsSignedIn(false);

      return navigate("/");
    } catch (error) {
      console.log("❌ Client SignOut Error:", error);
    }
  };

  useEffect(() => {
    if (cookieUserObjectId) {
      axios
        .get(`/users/${cookieUserObjectId}`)
        .then((res) => {
          const data = res.data;

          console.log("MyPage Data:", data);

          setUser(data);
        })
        .catch((error) => {
          console.log("❌ Client GetMyPage Error:", error);
        });
    }
  }, [cookieUserObjectId]);

  return (
    <>
      {cookieIsSignedIn ? (
        <StyledMain>
          <StyledSection1>
            <StyledH1>User Info</StyledH1>
            <StyledSection2>
              <StyledLabel1>
                <StyledH3>User Name</StyledH3>
                {user.userName}
              </StyledLabel1>
              <StyledLabel1>
                <StyledH3>User Phone Number</StyledH3>
                {user.phoneNumber}
              </StyledLabel1>
              <StyledLabel1>
                <StyledH3>User Address</StyledH3>
                {user.roadNameAddress}
              </StyledLabel1>
            </StyledSection2>
            <StyledLabel2>
              {cookieUserType === "2" ? (
                <StyledLink to="/registration">Registration</StyledLink>
              ) : (
                <></>
              )}
              <StyledLink to="/history">My Order</StyledLink>
              <StyledLink to="/wallet">My Wallet</StyledLink>
            </StyledLabel2>
            <StyledButton onClick={signOutHandler}>Sign Out</StyledButton>
          </StyledSection1>
        </StyledMain>
      ) : (
        <StyledLink to="/signin">Please Sign In</StyledLink>
      )}
    </>
  );
};

export default MyPage;
