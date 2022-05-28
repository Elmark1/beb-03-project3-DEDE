import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
`;

const StyledSectionType = styled.section`
  margin: 7px 0 17px 5px;
`;

const StyledSection2 = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 17px;
  border-top: 1px solid rgb(0, 194, 189);
`;

const StyledLabel1 = styled.label`
  width: 100%;
  padding-right: 32px;
`;

const StyledLabel2 = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 8px;
`;

const StyledRadio = styled.input`
  margin-left: 4px;
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
`;

const SignUp = ({ isSignedIn }) => {
  const navigate = useNavigate();
  const [signUpUserType, setSignUpUserType] = useState();
  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();
  const [password, setPassword] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [roadNameAddress, setRoadNameAddress] = useState();
  const [sigungu, setSigungu] = useState("");

  const openPostCode = () => {
    const { daum } = window;
    const postCode = new daum.Postcode({
      oncomplete: (data) => {
        setRoadNameAddress(data.address);
        setSigungu(data.sigungu);
      },
    }).open({ popupName: "postcode" });
  };

  const onSignUpUserTypeHandler = (e) => {
    setSignUpUserType(e.currentTarget.value);
  };

  const onUserNameHandler = (e) => {
    setUserName(e.currentTarget.value);
  };

  const onUserIdHandler = (e) => {
    setUserId(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onPhoneNumberHandler = (e) => {
    setPhoneNumber(e.currentTarget.value);
  };

  const onSubmitHandler = (e) => {
    if (
      !signUpUserType ||
      !userName ||
      !userId ||
      !password ||
      !phoneNumber ||
      !roadNameAddress
    ) {
      return alert("회원 정보를 모두 작성해주세요!");
    }

    let body = {
      userType: signUpUserType,
      userName,
      userId,
      password,
      phoneNumber,
      roadNameAddress,
      sigungu,
    };

    axios.post("/signup", body).then((res) => {
      console.log("res.data:", res.data);
      alert(
        `환영합니다!\n${res.data.userName}님의 지갑 주소는\n${res.data.walletAddress}\n입니다!`
      );
    });

    return navigate("/signin");
  };

  useEffect(() => {
    if (isSignedIn) {
      alert("✅ 로그인 된 유저입니다!");
      return navigate("/mypage");
    }
  }, []);

  return (
    <StyledMain>
      <StyledH2>SIGN UP</StyledH2>
      <StyledSection1>
        <StyledH4>User Type</StyledH4>
        <StyledSectionType>
          <StyledLabel1>
            Customer
            <StyledRadio
              type="radio"
              name="userType"
              value="1"
              onChange={onSignUpUserTypeHandler}
            />
          </StyledLabel1>
          <StyledLabel1>
            Restaurant
            <StyledRadio
              type="radio"
              name="userType"
              value="2"
              onChange={onSignUpUserTypeHandler}
            />
          </StyledLabel1>
          <StyledLabel1>
            Delivery Man
            <StyledRadio
              type="radio"
              name="userType"
              value="3"
              onChange={onSignUpUserTypeHandler}
            />
          </StyledLabel1>
        </StyledSectionType>
        <StyledSection2>
          <StyledLabel2>
            <StyledH4>User Name</StyledH4>
            <StyledInput
              name="userName"
              placeholder="userName"
              onChange={onUserNameHandler}
            />
          </StyledLabel2>
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
          <StyledLabel2>
            <StyledH4>Phone Number</StyledH4>
            <StyledInput
              name="phoneNumber"
              placeholder="phoneNumber"
              onChange={onPhoneNumberHandler}
            />
          </StyledLabel2>
          <StyledLabel2>
            <StyledH4>Road Name Address</StyledH4>
            <StyledInput
              name="roadNameAddress"
              placeholder="roadNameAddress"
              value={roadNameAddress}
              onClick={() => {
                openPostCode();
              }}
            />
          </StyledLabel2>
        </StyledSection2>
      </StyledSection1>
      <StyledButton type="submit" value="Submit" onClick={onSubmitHandler}>
        Submit
      </StyledButton>
    </StyledMain>
  );
};

export default SignUp;
