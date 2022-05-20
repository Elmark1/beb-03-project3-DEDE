import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Components/Navbar.js";
import Home from "./pages/Home.js";
import Restaurant from "./pages/Restaurant.js";
import History from "./pages/History.js";
import Wallet from "./pages/Wallet.js";
import MyPage from "./pages/MyPage.js";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [userObjectId, setUserObjectId] = useState();

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar isSignedIn={isSignedIn} />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/restaurant" element={<Restaurant />}></Route>
          <Route
            path="/history"
            element={<History userObjectId={userObjectId} />}
          ></Route>
          <Route
            path="/wallet"
            element={<Wallet userObjectId={userObjectId} />}
          ></Route>
          <Route
            path="/mypage"
            element={<MyPage userObjectId={userObjectId} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
