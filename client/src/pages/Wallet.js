import React, { useState, useEffect } from "react";
import axios from "axios";

const Wallet = ({ userObjectId }) => {
  const [user, setUser] = useState();
  const [tokenArray, setTokenArray] = useState([]); // ⭐️⭐️⭐️⭐️⭐️ token들을 map 사용해서 분리해줘야합니다.

  useEffect(() => {
    axios
      .get(`http://localhost:4000/users/${userObjectId}`)
      .then((res) => {
        const data = res.data;

        console.log("data:", data);

        setUser(data);
      })
      .catch((error) => {
        console.log("❌ ClientGetRestaurantsError:", error);
      });
  }, []);

  return (
    <>
      <div>
        {!user ? (
          <div>
            <br />
            <br />
            Please Login
          </div>
        ) : (
          <div>
            {/* <div>My Token : {user.token}</div> */}
            <div>My Staking: {user.stakedToken}</div>
            <div>My NFTs: {user.collectedNft}</div>
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
