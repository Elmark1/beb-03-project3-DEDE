import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Cookies } from "react-cookie";
import styled from 'styled-components';

// Import components
import SwapModal from '../components/SwapModal.js';
import TransferModal from '../components/TransferModal.js';
import StakeModal from '../components/StakeModal.js';
import NftModal from '../components/NftModal.js';
import SellingNftModal from '../components/SellingNftModal.js';

// Import Klaytn logo
import {ReactComponent as Klaytn} from '../images/klaytn.svg';

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  padding: 100px 50px 50px 50px;
`;

const StyledButton = styled.button`
  color: white;
  background: #00c2bd;
  padding: 0.375rem 0.75rem;
  border: 1px solid #00c2bd;
  border-radius: 10px;
  width: 9em;
  cursor: pointer;
  margin: 0 5px;
`;

const Card = styled.div`
  height: 225px;
  width: 400px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  background-color:hsla(183,100%,50%,1);
  background-image:
  radial-gradient(at 40% 20%, hsla(147,100%,74%,1) 0px, transparent 50%),
  radial-gradient(at 80% 0%, hsla(180,100%,56%,1) 0px, transparent 50%),
  radial-gradient(at 0% 50%, hsla(191,100%,93%,1) 0px, transparent 50%),
  radial-gradient(at 80% 50%, hsla(224,100%,76%,1) 0px, transparent 50%),
  radial-gradient(at 0% 100%, hsla(214,100%,77%,1) 0px, transparent 50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: -1;
`;

const InfoDiv = styled.div`
  color: #484a48;
`;

const ButtonsDiv = styled.div`
  width: 450px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 15px;
`;

const Wallet = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [tokenArray, setTokenArray] = useState([]); // ⭐️⭐️⭐️⭐️⭐️ token들을 map 사용해서 분리해줘야합니다.
  const cookieUserType = cookies.get("userType");
  const cookieUserObjectId = cookies.get("userObjectId");

  const [isSwapClicked, setIsSwapClicked] = useState(false);
  const [isTransferClicked, setIsTransferClicked] = useState(false);
  const [isStakeClicked, setIsStakeClicked] = useState(false);
  const [isNftClicked, setIsNftClicked] = useState(false);
  const [isSellingNftClicked, setIsSellingNftClicked] = useState(false);

  useEffect(() => {
	if (cookieUserObjectId) {
	  axios
		.get(`/users/${cookieUserObjectId}`)
		.then((res) => {
		  const data = res.data;

		  console.log("data:", data);

		  setUser(data);
		  return data;
		})
		.catch((error) => {
		  console.log("❌ Client GetWalletInfo Error:", error);
		});
	}
  }, [cookieUserObjectId]);

  const swapButtonHandler = () => {
	setIsSwapClicked(prevState => !prevState);
	console.log(isSwapClicked);
  }

  const transferButtonHandler = () => {
	setIsTransferClicked(prevState => !prevState);
  }

  const stakeButtonHandler = () => {
	setIsStakeClicked(prevState => !prevState);
  }

  const nftButtonHandler = () => {
	setIsNftClicked(prevState => !prevState);
  }

  const sellingNftButtonHandler = () => {
	setIsSellingNftClicked(prevState => !prevState);
  }

  return (
	<>
	  {isSwapClicked ? <SwapModal setIsSwapClicked={setIsSwapClicked} /> : null}
	  {isTransferClicked ? <TransferModal setIsTransferClicked={setIsTransferClicked} /> : null}
	  {isStakeClicked ? <StakeModal setIsStakeClicked={setIsStakeClicked} /> : null}
	  <StyledMain>
		<Card>
		  <Klaytn width="30" height="30" />
		  {!user ? null
		  : (
			<InfoDiv>
			  <div>Klay: {user.klay}</div>
			  <div>DEDE: {user.token}</div>
			  {cookieUserType !== '1' && <div>Staking: {user.stakedToken}</div>}
			  <div>{user.walletAddress}</div>
			</InfoDiv>
		  )}
		</Card>

		<ButtonsDiv>
		  <StyledButton onClick={swapButtonHandler} >Swap</StyledButton>
		  <StyledButton onClick={transferButtonHandler} >Transfer</StyledButton>
		  {cookieUserType !== '1' && 
			<StyledButton onClick={stakeButtonHandler} >Stake</StyledButton>}
		  {cookieUserType === '1' &&
			<StyledButton onClick={nftButtonHandler} >NFT</StyledButton>}
		  {cookieUserType === '2' &&
			<StyledButton onClick={sellingNftButtonHandler} >Selling NFT</StyledButton>}
		</ButtonsDiv>

		{cookieUserType === "1" && user && isNftClicked && <NftModal
		  setIsNftClicked={setIsNftClicked} 
		  nft={user.collectedNft}
		/>}

		{cookieUserType === '2' && user && isSellingNftClicked && <SellingNftModal 
		  setIsSellingNftClicked={setIsSellingNftClicked}
		  sellingNft={user.customMadeNft}
		/>}

	  </StyledMain>
	</>
  );
};

export default Wallet;
