import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";
import { CookiesProvider } from "react-cookie";
import reportWebVitals from "./reportWebVitals";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true; // 쿠키 설정 허용

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
