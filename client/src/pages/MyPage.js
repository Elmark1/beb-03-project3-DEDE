import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignIn from "./SignIn";
import { Cookies } from "react-cookie";

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
        <div>
          <div>
            <br />
            <br />
            <div>User Info</div>
            <br />
            <div>User Name: {user.userName}</div>
            <div>User Phone Number: {user.phoneNumber}</div>
            <div>User Address: {user.roadNameAddress}</div>
            {cookieUserType === "2" ? (
              <div>
                <Link to="/registration">Registration</Link>
              </div>
            ) : (
              <></>
            )}
            <div>
              <Link to="/history">My Order</Link>
            </div>

            <div>
              <Link to="/wallet">My Wallet</Link>
            </div>
          </div>
          <button onClick={signOutHandler}>Sign Out</button>
        </div>
      ) : (
        <div>
          <br />
          <Link to="/signin">Please Sign In</Link>
        </div>
      )}
    </>
  );
};

export default MyPage;
