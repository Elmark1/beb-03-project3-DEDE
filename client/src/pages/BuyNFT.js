import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Cookies } from "react-cookie";
import styled from 'styled-components';

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledH1 = styled.h1`
  margin: 60px 0 30px 0;
`;

const StyledH2 = styled.h2`
  margin-bottom: 20px;
`;

const StyledSection1 = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 480px;
  border-top: 1px solid rgb(0, 194, 189);
`;

const StyledSection2 = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 40px 0 0 0;
  padding: 26px;
  border: 1px solid rgb(0, 194, 189);
  border-radius: 20px;
  position: relative;
`;

const StyledLabel = styled.label`
  margin-bottom: 3px;
`;

const StyledButton = styled.button`
  color: white;
  background: #00c2bd;
  padding: 0.375rem 0.75rem;
  border: 1px solid #00c2bd;
  border-radius: 10px;
  width: 10em;
  height: 30px;
  cursor: pointer;
`;

const BuyNFT = () => {
  const { restaurantObjectId } = useParams();
  const [nfts, setNfts] = useState([]);
  const [selectedNft, setSelectedNft] = useState({}); // ⭐️⭐️⭐️⭐️⭐️ selectedNft는 발행해줘야할 nft 모델의 id입니다.

  const cookies = new Cookies();

  const onNftHandler = (e) => {
	setSelectedNft(e.currentTarget.value);
  };

  const onBuyHandler = async (nft) => {
	const customerId = cookies.get("userObjectId");
	let body = { ...nft, restaurantObjectId: nft.user_id, customerId }; // ⭐️⭐️⭐️⭐️⭐️ body에 보낼 키-값을 작성해줘야 합니다.

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
	<StyledMain>
	  <StyledH1>
		NFT List
	  </StyledH1>
	  <StyledSection1>
		{nfts.map((nft) => {
		  return (
			<StyledSection2 key={nft._id}>
			  <StyledH2>{nft.nftName}</StyledH2>
			  <StyledLabel>{nft.discountRate} (%)</StyledLabel>
			  <StyledLabel>{nft.nftPrice} (DEDE)</StyledLabel>
			  <StyledButton
				onClick={() => {
				  onBuyHandler(nft);
				}}
			  >
				Buy
			  </StyledButton>
			</StyledSection2>
		  );
		})}
	  </StyledSection1>
	</StyledMain>
  );
};

export default BuyNFT;
