import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignIn from "./SignIn";
import { Cookies } from "react-cookie";

const MyPage = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const cookieIsSignedIn = cookies.get("isSignedIn");
  const cookieUserType = cookies.get("userType");
  const cookieUserObjectId = cookies.get("userObjectId");

  const signOutHandler = () => {
    try {
      cookies.remove("isSignedIn");
      cookies.remove("userType");
      cookies.remove("userObjectId");

      axios.post("/signout");

      return navigate("/");
    } catch (error) {
      console.log("❌ Client SignOut Error:", error);
    }
  };

  useEffect(() => {
    console.log("Cookie userType:", cookieUserType);

    if (!cookieIsSignedIn) {
      return navigate("/signin");
    }

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
  }, []);

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
        <SignIn />
      )}
    </>
  );
};

export default MyPage;
