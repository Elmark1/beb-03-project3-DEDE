import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignIn from "./SignIn";

const MyPage = ({ cookies, isSignedIn, userObjectId }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const signOutHandler = () => {
    try {
      cookies.remove("isSignedIn");
      cookies.remove("userType");
      cookies.remove("userObjectId");
      axios.post("/signout");

      return navigate("/");
    } catch (error) {
      // ⭐️⭐️⭐️⭐️⭐️ 로그아웃에 실패했을 때, 어떻게 하면 좋을지..
      console.log("❌ Client SignOut Error:", error);
    }
  };

  useEffect(() => {
    if (!isSignedIn) {
      return navigate("/signin");
    }

    axios
      .get(`/users/${userObjectId}`)
      .then((res) => {
        const data = res.data;

        console.log("MyPage Data:", data);

        setUser(data);
      })
      .catch((error) => {
        console.log("❌ Client GetMyPage Error:", error);
      });
  }, [userObjectId]);

  return (
    <>
      {isSignedIn ? (
        <div>
          <div>
            <br />
            <br />
            <div>User Info</div>
            <br />
            <div>User Name: {user.userName}</div>
            <div>User Phone Number: {user.phoneNumber}</div>
            <div>User Address: {user.roadNameAddress}</div>
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
