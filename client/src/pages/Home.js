import React, { useState } from "react";
import HomeSection from "../Components/HomeSection";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <HomeSection />
    </>
  );
};

export default Home;
