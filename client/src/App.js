import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Components/Navbar.js";
import Home from "./Pages/Home.js";
import Restaurant from "./Pages/Restaurant.js";
import History from "./Pages/History.js";
import Wallet from "./Pages/Wallet.js";
import MyPage from "./Pages/MyPage.js";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import NotFound from "./Pages/NotFound";
import { Cookies } from "react-cookie";

function App() {
  const cookies = new Cookies();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userType, setUserType] = useState(0); // ⭐️⭐️⭐️⭐️⭐️ userType이 최종적으로 사용되지 않는다면 삭제해주자. 사용할 거 같긴한데.
  const [userObjectId, setUserObjectId] = useState("");

  useEffect(() => {
    console.log("로그인 상태를 쿠키에 저장했다!:", cookies.get("isSignedIn"));
    const cookieIsSignedIn = cookies.get("isSignedIn");
    const cookieUserType = cookies.get("userType");
    const cookieUserObjectId = cookies.get("userObjectId");

    if (cookieIsSignedIn) {
      console.log("App.js 렌더링 됩니다!");
      setIsSignedIn(true);
      setUserType(cookieUserType);
      setUserObjectId(cookieUserObjectId);
    }
  });

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar isSignedIn={isSignedIn} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/restaurant" element={<Restaurant />}></Route>
          <Route path="/history" element={<History />}></Route>
          <Route
            path="/wallet"
            element={<Wallet userObjectId={userObjectId} />}
          ></Route>
          <Route
            path="/signin"
            element={
              <SignIn isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
            }
          />
          <Route path="/signup" element={<SignUp isSignedIn={isSignedIn} />} />
          <Route
            path="/mypage"
            element={
              <MyPage
                cookies={cookies}
                isSignedIn={isSignedIn}
                userObjectId={userObjectId}
              />
            }
          ></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
