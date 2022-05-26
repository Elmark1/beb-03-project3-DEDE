import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar.js";
import Home from "./pages/Home.js";
import Restaurant from "./pages/Restaurant.js";
import Order from "./pages/Order";
import BuyNFT from "./pages/BuyNFT";
import History from "./pages/History.js";
import Pending from "./pages/Pending.js";
import Wallet from "./pages/Wallet.js";
import MyPage from "./pages/MyPage.js";
import Registration from "./pages/Registration.js";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import { Cookies } from "react-cookie";

function App() {
  const cookies = new Cookies();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userType, setUserType] = useState(0);
  const [userObjectId, setUserObjectId] = useState("");
  const cookieIsSignedIn = cookies.get("isSignedIn");
  const cookieUserType = cookies.get("userType");
  const cookieUserObjectId = cookies.get("userObjectId");

  useEffect(() => {
    if (cookieIsSignedIn) {
      setIsSignedIn(true);
      setUserType(cookieUserType);
      setUserObjectId(cookieUserObjectId);
    }
  }, [isSignedIn]);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar isSignedIn={isSignedIn} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/restaurants" element={<Restaurant />}></Route>
          <Route
            path="/restaurants/:restaurantObjectId/menus"
            element={<Order userObjectId={userObjectId} />}
          ></Route>
          <Route
            path="/restaurants/:restaurantObjectId/nfts"
            element={<BuyNFT userObjectId={userObjectId} />}
          ></Route>
          <Route path="/history" element={<History />}></Route>
          <Route path="/pending" element={<Pending />}></Route>
          <Route
            path="/wallet"
            element={<Wallet userObjectId={userObjectId} />}
          ></Route>
          <Route
            path="/signin"
            element={
              <SignIn
                isSignedIn={isSignedIn}
                setIsSignedIn={setIsSignedIn}
                setUserType={setUserType}
                setUserObjectId={setUserObjectId}
              />
            }
          />
          <Route path="/signup" element={<SignUp isSignedIn={isSignedIn} />} />
          <Route
            path="/mypage"
            element={
              <MyPage
                cookies={cookies}
                isSignedIn={isSignedIn}
                userType={userType}
                userObjectId={userObjectId}
                setIsSignedIn={setIsSignedIn}
              />
            }
          ></Route>
          <Route
            path="/registration"
            element={
              <Registration
                isSignedIn={isSignedIn}
                userType={userType}
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
