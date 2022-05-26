import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Cookies } from "react-cookie";

const BuyNFT = () => {
  const { restaurantObjectId } = useParams();
  const [nfts, setNfts] = useState([]);
  const [selectedNft, setSelectedNft] = useState({}); // ⭐️⭐️⭐️⭐️⭐️ selectedNft는 발행해줘야할 nft 모델의 id입니다.

  const cookies = new Cookies();

  const onNftHandler = (e) => {
    e.preventDefault();
    setSelectedNft(e.currentTarget.value);
  };

  const onBuyHandler = async (nft) => {
	const customerId = cookies.get("userObjectId");
	let body = {...nft, restaurantObjectId: nft.user_id, customerId}; // ⭐️⭐️⭐️⭐️⭐️ body에 보낼 키-값을 작성해줘야 합니다.

	console.log(body);
    await axios.post("/nfts", body); // ⭐️⭐️⭐️⭐️⭐️ customer의 지갑으로 NFT가 민팅되는 것을 구현해야 합니다.
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
			<button onClick={() => {onBuyHandler(nft)}}>
        	  Buy
        	</button>
          </div>
        );
      })}
      <br />
    </>
  );
};

export default BuyNFT;
