import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = ({ isSignedIn }) => {
  const navigate = useNavigate();
  const [signUpUserType, setSignUpUserType] = useState();
  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();
  const [password, setPassword] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [roadNameAddress, setRoadNameAddress] = useState();

  const onSignUpUserTypeHandler = (e) => {
    e.preventDefault();
    setSignUpUserType(e.currentTarget.value);
  };
  const onUserNameHandler = (e) => {
    e.preventDefault();
    setUserName(e.currentTarget.value);
  };
  const onUserIdHandler = (e) => {
    e.preventDefault();
    setUserId(e.currentTarget.value);
  };
  const onPasswordHandler = (e) => {
    e.preventDefault();
    setPassword(e.currentTarget.value);
  };
  const onPhoneNumberHandler = (e) => {
    e.preventDefault();
    setPhoneNumber(e.currentTarget.value);
  };
  const onRoadNameAddressHandler = (e) => {
    e.preventDefault();
    setRoadNameAddress(e.currentTarget.value);
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
  });

  return (
    <>
      <div>
        <br />
        <div>Sign Up</div>
        <br />
        <div>
          <label>
            <input
              type="radio"
              name="userType"
              value="1"
              onChange={onSignUpUserTypeHandler}
            />
            Customer
          </label>
          <label>
            <input
              type="radio"
              name="userType"
              value="2"
              onChange={onSignUpUserTypeHandler}
            />
            Restaurant
          </label>
          <label>
            <input
              type="radio"
              name="userType"
              value="3"
              onChange={onSignUpUserTypeHandler}
            />
            Delivery Man
          </label>
          <input
            name="userName"
            placeholder="userName"
            onChange={onUserNameHandler}
          />
          <input
            name="userId"
            placeholder="userId"
            onChange={onUserIdHandler}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={onPasswordHandler}
          />
          <input
            name="phoneNumber"
            placeholder="phoneNumber"
            onChange={onPhoneNumberHandler}
          />
          <input
            name="roadNameAddress"
            placeholder="roadNameAddress"
            onChange={onRoadNameAddressHandler}
          />
          <p>
            <button type="submit" value="Submit" onClick={onSubmitHandler}>
              Submit
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
