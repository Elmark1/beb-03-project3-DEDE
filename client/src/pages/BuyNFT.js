import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BuyNFT = () => {
  const { restaurantObjectId } = useParams();
  const [nfts, setNfts] = useState([]);
  const [selectedNft, setSelectedNft] = useState(""); // ⭐️⭐️⭐️⭐️⭐️ selectedNft는 발행해줘야할 nft 모델의 id입니다.

  const onNftHandler = (e) => {
    e.preventDefault();
    setSelectedNft(e.currentTarget.value);
  };

  const onBuyHandler = async (e) => {
    let body = {}; // ⭐️⭐️⭐️⭐️⭐️ body에 보낼 키-값을 작성해줘야 합니다.

    // await axios.post("/nfts", body); // ⭐️⭐️⭐️⭐️⭐️ customer의 지갑으로 NFT가 민팅되는 것을 구현해야 합니다.
  };

  useEffect(() => {
    axios
      .get(`/restaurants/${restaurantObjectId}/nfts`)
      .then((res) => {
        const data = res.data.nftList;

        console.log("data:", data);

        setNfts(data);
      })
      .catch((error) => {
        console.log("❌ Client Get Restaurant NFTs Error:", error);
      });
  }, []);

  return (
    <>
      <br />
      NFT List
      {nfts.map((nft) => {
        return (
          <div key={nft._id}>
            <br />
            <div>{nft.nftName}</div>
            <div>{nft.discountRate} (%)</div>
            <div>{nft.nftPrice} (DEDE)</div>
            <input
              type="radio"
              name="nftInfo"
              value={nft._id}
              onChange={onNftHandler}
            />
          </div>
        );
      })}
      <br />
      <p>
        <button type="submit" value="Submit" onClick={onBuyHandler}>
          Buy
        </button>
      </p>
    </>
  );
};

export default BuyNFT;
