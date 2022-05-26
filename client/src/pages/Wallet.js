import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Cookies } from "react-cookie";

// Import components
import SwapModal from '../components/SwapModal.js';
import TransferModal from '../components/TransferModal.js';
import StakeModal from '../components/StakeModal.js';

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

  useEffect(() => {
    if (cookieUserObjectId) {
      axios
        .get(`http://localhost:4000/users/${cookieUserObjectId}`)
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

  return (
    <>
	  {isSwapClicked ? <SwapModal setIsSwapClicked={setIsSwapClicked} /> : null}
	  {isTransferClicked ? <TransferModal setIsTransferClicked={setIsTransferClicked} /> : null}
	  {isStakeClicked ? <StakeModal setIsStakeClicked={setIsStakeClicked} /> : null}
      <div>
        {!user ? (
          <div>
            <br />
            <br />
            <Link to="/signin">Please Sign In</Link>
          </div>
        ) : (
          <div>
            <br />
			<div>My Klay : {user.klay}</div>
            <div>My Token : {user.token}</div>
            <div>My Staking: {user.stakedToken}</div>
            {cookieUserType === "2" ? (
              <div>
                My Custom-made NFT:
                {user.customMadeNft.map((nft) => {
                  return (
                    <div key={nft._id}>
                      <div>{nft.nftName}</div>
                      <div>{nft.discountRate}</div>
                      <div>{nft.nftPrice}</div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <></>
            )}
            {cookieUserType === "1" ? (
			  <div>NFT: {
			  user.collectedNft.map(json => {
				const metadata = JSON.parse(json);

				return (
				  <div key={metadata._id}>
					<div>NFT Name: {metadata.nftName}</div>
					<div>Discount Rate: {metadata.discountRate}</div>
					<div>Expired by: {new Date(metadata.expired).toString()}</div>
				  </div>
				)
			  })}
			  </div>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
      <br />
      <button onClick={swapButtonHandler} >Swap</button>
      <button onClick={transferButtonHandler} >Transfer</button>
      <button onClick={stakeButtonHandler} >Stake</button>
    </>
  );
};

export default Wallet;
