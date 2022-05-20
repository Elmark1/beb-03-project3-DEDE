import React, { useState } from "react";
import AboutSection from "../Components/AboutSection";
import HomeSection from "../Components/HomeSection";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import TeamSection from "../Components/TeamSection";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <HomeSection />
      <AboutSection />
      <TeamSection />
    </>
  );
};

export default Home;
