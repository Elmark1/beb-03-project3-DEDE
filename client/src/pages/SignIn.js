import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import MyPage from "./MyPage";

const SignIn = ({ isSignedIn, setIsSignedIn }) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies([
    "isSignedIn",
    "userType",
    "userObjectId",
  ]);

  const onUserIdHandler = (e) => {
    e.preventDefault();
    setUserId(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    e.preventDefault();
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

        setCookie("isSignedIn", true);
        setCookie("userType", data.userType);
        setCookie("userObjectId", data.userObjectId);
      })
      .then(() => {
        setIsSignedIn(true);
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
        <div>
          <br />
          <br />
          <div>Sign In</div>
          <br />
          <div>
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
            <button type="submit" onClick={onSubmitHandler}>
              Sign In
            </button>
          </div>
          <Link to="/signup">Sign Up</Link>
        </div>
      ) : (
        <MyPage />
      )}
    </>
  );
};

export default SignIn;
