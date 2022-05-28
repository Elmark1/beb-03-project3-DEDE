import React from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { AiOutlineCopyrightCircle, AiFillGithub } from "react-icons/ai";

const StyledFooter = styled.footer`
  margin-top: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
		<a href='https://github.com/codestates/beb-03-project3-DEDE' >
		<AiFillGithub size='50px' color='#00c2bd' />
		</a>
	  </FooterContent>
	  <FooterContent>
		<p>© Copyright 2022 Team DEDE.</p>
	  </FooterContent>
	</StyledFooter>
  );
}

export default Footer;
