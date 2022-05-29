import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";
import { CookiesProvider } from "react-cookie";
import reportWebVitals from "./reportWebVitals";
import GlobalStyle from './fonts/GlobalStyle.js'; 

axios.defaults.baseURL = "https://dede-server.herokuapp.com";
axios.defaults.withCredentials = true; // 쿠키 설정 허용

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CookiesProvider>
	<GlobalStyle />
    <App />
  </CookiesProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
