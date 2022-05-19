import React, { useState } from "react";
import HomeSection from "../Components/HomeSection";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <HomeSection />
    </>
  );
};

export default Home;
