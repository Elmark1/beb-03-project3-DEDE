import React, { useState } from "react";

const History = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return <></>;
};

export default History;
