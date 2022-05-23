import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Cookies } from "react-cookie";

const Wallet = () => {
  const cookies = new Cookies();
  const [user, setUser] = useState();
  const [tokenArray, setTokenArray] = useState([]); // ⭐️⭐️⭐️⭐️⭐️ token들을 map 사용해서 분리해줘야합니다.
  const cookieUserType = cookies.get("userType");
  const cookieUserObjectId = cookies.get("userObjectId");

  useEffect(() => {
    axios
      .get(`http://localhost:4000/users/${cookieUserObjectId}`)
      .then((res) => {
        const data = res.data;

        console.log("data:", data);

        setUser(data);
      })
      .catch((error) => {
        console.log("❌ Client GetWalletInfo Error:", error);
      });
  }, []);

  return (
    <>
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
            {/* <div>My Token : {user.token}</div> */}
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
              <div>My NFTs: {user.collectedNft}</div>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
      <br />
      <button>Swap</button>
      <button>Transfer</button>
      <button>Stake</button>
    </>
  );
};

export default Wallet;
