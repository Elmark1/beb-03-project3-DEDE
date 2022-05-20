import React, { useState } from "react";

const MyPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return <></>;
};

export default MyPage;
