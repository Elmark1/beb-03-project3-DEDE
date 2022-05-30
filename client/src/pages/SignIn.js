import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import MyPage from "./MyPage";

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledH2 = styled.h2`
  margin: 60px 0 15px 0;
`;

const StyledH4 = styled.h4`
  margin: 20px 0 5px 0;
`;

const StyledSection1 = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 380px;
  margin-bottom: 20px;
`;

const StyledLabel2 = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 8px;
`;

const StyledInput = styled.input`
  height: 33px;
  padding-left: 10px;
  border: 1px solid grey;
  border-radius: 7px;
`;

const StyledButton = styled.button`
  color: white;
  background: #00c2bd;
  padding: 0.375rem 0.75rem;
  border: 1px solid #00c2bd;
  border-radius: 10px;
  width: 10em;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  color: #00c2bd;
  margin: 15px;
`;

const SignIn = ({ isSignedIn, setIsSignedIn }) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies([
    "isSignedIn",
    "userType",
    "userObjectId",
    "sigungu",
    "stakedToken",
  ]);

  // const cookieOptions = {
  //   maxAge: 3600,
  //   // httpOnly: true, // ⭐️⭐️⭐️⭐️⭐️ server에서만 줄 수 있는 옵션입니다.
  //   sameSite: "strict",
  // };

  const onUserIdHandler = (e) => {
    setUserId(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onSubmitHandler = () => {
    let user = {
      userId,
      password,
    };

    axios
      .post("/signin", user)
      .then((res) => {
        const data = res.data;

        setIsSignedIn(true);
        setCookie("isSignedIn", true, { maxAge: 3600 });
        setCookie("userType", data.userType, { maxAge: 3600 });
        setCookie("userObjectId", data.userObjectId, { maxAge: 3600 });
        setCookie("sigungu", data.sigungu, { maxAge: 3600 });
        setCookie("stakedToken", data.stakedToken, { maxAge: 3600 });
		setCookie("accessToken", data.accessToken, {maxAge: 3600});
		axios.defaults.headers.common['authorization'] = `Bearer ${data.accessToken}`;
      })
      .then(() => {
        return navigate("/mypage");
      })
      .catch((error) => {
        console.log("❌ Client SignIn Error:", error);
      });
  };

  useEffect(() => {
    if (isSignedIn) {
      return navigate("/mypage");
    }
  }, [isSignedIn]);

  return (
    <>
      {!isSignedIn ? (
        <StyledMain>
          <StyledH2>SIGN IN</StyledH2>
          <StyledSection1>
            <StyledLabel2>
              <StyledH4>User ID</StyledH4>
              <StyledInput
                name="userId"
                placeholder="userId"
                onChange={onUserIdHandler}
              />
            </StyledLabel2>
            <StyledLabel2>
              <StyledH4>Password</StyledH4>
              <StyledInput
                type="password"
                name="password"
                placeholder="password"
                onChange={onPasswordHandler}
              />
            </StyledLabel2>
          </StyledSection1>
          <StyledButton type="submit" onClick={onSubmitHandler}>
            Sign In
          </StyledButton>
          <StyledLink to="/signup">Sign Up</StyledLink>
        </StyledMain>
      ) : (
        <MyPage />
      )}
    </>
  );
};

export default SignIn;
