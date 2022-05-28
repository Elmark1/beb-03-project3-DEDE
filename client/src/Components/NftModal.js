// import packages
import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Cookies } from "react-cookie";

const ModalBackdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  width: 30%;
  height: 60%;
  padding: 40px;
  text-align: center;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
`;

const ModalButton = styled.button.attrs(props => ({
  onClick: props.onClick,
}))`
  color: white;
  background: #00c2bd;
  padding: 0.375rem 0.75rem;
  border: 1px solid #00c2bd;
  border-radius: 10px;
  width: 10em;
  cursor: pointer;
  margin: 0 auto 5px auto;
`;

const Alert = styled.h2`
  margin-bottom: 5px;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 500px;
  overflow-y: scroll;
  padding: 15px;
  margin-bottom: 15px;
`;

const Content = styled.div`
  margin: 10px;
`;

const NftModal = ({setIsNftClicked, nft}) => {
  return (
	<>
	  <ModalBackdrop>
		<ModalView>
		  <Alert>NFT</Alert>
		  <Contents>
			{nft.length === 0 && <div>You don't have any NFT!</div>}
			{nft.map(el => {
			  const metadata = JSON.parse(el);
			  return (
				<Content key={metadata._id} >
				  <div>Name: {metadata.nftName}</div>
				  <div>Discount Rate: {metadata.discountRate}%</div>
				  <div>Until {new Date(metadata.expired).toDateString()}</div>
				</Content>
			  );
			})}
		  </Contents>
		  <ModalButton onClick={() => setIsNftClicked(false)}>Close</ModalButton>
		</ModalView>
	  </ModalBackdrop>
	</>
  );
}

export default NftModal;
