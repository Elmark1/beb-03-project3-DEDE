import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Components/Navbar.js";
import Home from "./Pages/Home.js";
import Restaurant from "./Pages/Restaurant.js";
import History from "./Pages/History.js";
import Wallet from "./Pages/Wallet.js";
import MyPage from "./Pages/MyPage.js";

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
