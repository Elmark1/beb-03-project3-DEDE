import React, { useState } from "react";
import AboutSection from "../components/AboutSection";
import HomeSection from "../components/HomeSection";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TeamSection from "../components/TeamSection";

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
