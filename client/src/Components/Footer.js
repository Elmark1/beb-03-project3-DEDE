import React from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';

const StyledFooter = styled.footer`
  margin-top: auto;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  padding: 25px 30px 15px 30px;
  height: 90px;
  box-shadow: 0px 0.5px 20px rgb(50, 194, 189);
`;

const FooterContent = styled.div`
  color: #00c2bd;
`;

const Footer = () => {
  return (
	<StyledFooter>
	  <FooterContent>
		<p>© Copyright 2022 Team DEDE.</p>
	  </FooterContent>
	</StyledFooter>
  );
}

export default Footer;
