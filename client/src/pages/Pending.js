import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

const StyledSection1 = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 480px;
  border-top: 1px solid rgb(0, 194, 189);
  margin-bottom: 15px;
`;

const StyledButton = styled.button`
  color: white;
  background: #00c2bd;
  padding: 0.375rem 0.75rem;
  border: 1px solid #00c2bd;
  border-radius: 10px;
  width: 10em;
  height: 30px;
`;

const StyledLabel = styled.label`
  margin-bottom: 3px;
`;

const StyledSection2 = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 40px 0 0 0;
  padding: 30px;
  border: 1px solid rgb(0, 194, 189);
  border-radius: 20px;
`;

const StyledLabel3 = styled.label``;

const StyledRadio = styled.input`
  margin-left: 4px;
`;

const StyledH2 = styled.h2`
  margin-bottom: 3px;
`;

const StyledLabel2 = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 8px;
`;

const Pending = () => {
  const cookies = new Cookies();
  const [pending, setPending] = useState([]);
  const [status, setStatus] = useState("");
  const [orderObjectId, setOrderObjectId] = useState("");
  const cookieIsSignedIn = cookies.get("isSignedIn");
  const cookieUserType = cookies.get("userType");
  const cookieUserObjectId = cookies.get("userObjectId");

  const onStatusHandler = (e) => {
	setOrderObjectId(e.currentTarget.name);
	setStatus(e.currentTarget.value);
  };

  const onSubmitHandler = async () => {
	let body = { deliveryManObjectId: cookieUserObjectId, status };

	await axios.patch(`/orders/${orderObjectId}`, body).then((res) => {
	  const data = res.data;

	  console.log(data.message);
	});
  };

  useEffect(() => {
	if (cookieUserObjectId) {
	  axios
		.get(`/orders`)
		.then(async (res) => {
		  let pendingOrder = [];

		  res.data.orderList.map((order) => {
			if (order.status === "Cooking") {
			  pendingOrder.push(order);
			}
		  });

		  console.log("pendingOrder:", pendingOrder);

		  setPending(pendingOrder);
		})
		.catch((error) => {
		  console.log("❌ Client Get Pending Page Error:", error);
		});
	}
  }, [cookieUserObjectId]);

  return (
	<StyledMain>
	  <StyledH1>Pending Order</StyledH1>
	  {pending.length === 0 ? <div>❗️ No Pending Order</div> : <></>}
	  <StyledSection1>
		{pending.map((order) => {
		  return (
			<StyledSection2 key={order._id}>
			  <StyledLabel2>
				<StyledH2>
				  Status
				</StyledH2>
				{order.status}
			  </StyledLabel2>
			  <StyledLabel2>
				<StyledH2>
				  Customer
				</StyledH2>
				{order.user1_id.userName}
			  </StyledLabel2>
			  <StyledLabel2>
				<StyledH2>
				  Customer Address
				</StyledH2>
				{order.user1_id.roadNameAddress}
			  </StyledLabel2>
			  <StyledLabel2>
				<StyledH2>
				  Restaurant
				</StyledH2>
				{order.user2_id.userName}
			  </StyledLabel2>
			  <StyledLabel2>
				<StyledH2>
				  Restaurant Address
				</StyledH2>
				{order.user2_id.roadNameAddress}
			  </StyledLabel2>
			  <StyledLabel2>
				<StyledH2>
				  Restaurant Staked Token
				</StyledH2>
				{order.user2_id.stakedToken}
			  </StyledLabel2>
			  <StyledLabel2>
				<StyledH2>
				  Distance between Customer and Restaurant
				</StyledH2>
				{order.distance} (m)
			  </StyledLabel2>
			  <StyledH2>Ordered Menu</StyledH2>
			  {order.orderedMenu.map((menuInfo, index) => {
				return (
				  <StyledSection2 key={index}>
					<StyledH2>{menuInfo.menuName}</StyledH2>
					<StyledLabel>{menuInfo.menuDescription}</StyledLabel>
					<StyledLabel>{menuInfo.menuPrice} (DEDE)</StyledLabel>
				  </StyledSection2>
				);
			  })}
			  {cookieUserType === "3" ? (
				<StyledLabel3>
				  <StyledRadio
					type="radio"
					name={order._id}
					value="Delivery"
					onClick={onStatusHandler}
				  />
				  Delivery
				</StyledLabel3>
			  ) : (
				<></>
			  )}
			</StyledSection2>
		  );
		})}
	  </StyledSection1>
	  {cookieUserType === "3" ? (
		<StyledButton onClick={onSubmitHandler}>Submit</StyledButton>
	  ) : (
		<div>
		  <br />
		  <Link to="/signin">Please Sign In</Link>
		</div>
	  )}
	</StyledMain>
  );
};

export default Pending;
