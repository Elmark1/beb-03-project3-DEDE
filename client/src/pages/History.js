import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";
import styled from "styled-components";

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
  margin-bottom: 3px;
`;

const StyledSection1 = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 480px;
  border-top: 1px solid rgb(0, 194, 189);
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

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  margin: 26px;

  &:visited,
  &:link {
    color: black;
  }

  &:focus,
  &:hover,
  &:active {
    color: white;
  }
`;

const StyledLabel2 = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 8px;
`;

const StyledLabel4 = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 8px;
  padding-top: 30px;
  border-top: 1px solid rgb(0, 194, 189);
`;

const StyledLabel3 = styled.label``;

const StyledRadio = styled.input`
  margin-left: 4px;
`;

const StyledButton = styled.button`
  color: white;
  background: #00c2bd;
  padding: 0.375rem 0.75rem;
  margin: 20px 0;
  border: 1px solid #00c2bd;
  border-radius: 10px;
  width: 10em;
`;

const History = () => {
  const cookies = new Cookies();
  const [history, setHistory] = useState([]);
  const [status, setStatus] = useState("");
  const [orderObjectId, setOrderObjectId] = useState("");
  const cookieIsSignedIn = cookies.get("isSignedIn");
  const cookieUserType = cookies.get("userType");
  const cookieUserObjectId = cookies.get("userObjectId");

  const onStatusHandler = (e) => {
    setOrderObjectId(e.currentTarget.name);
    setStatus(e.currentTarget.value);
  };

  const onSubmitHandler = async (e) => {
    let body = { status };

    await axios.patch(`/orders/${orderObjectId}`, body).then((res) => {
      const data = res.data;

      console.log(data.message);
    });
  };

  useEffect(() => {
    if (cookieUserObjectId) {
      axios
        .get(`/orders/history`)
        .then((res) => {
          const data = res.data.history;

          console.log("data:", data);

          setHistory(data);
        })
        .catch((error) => {
          console.log("❌ Client Get History Page Error:", error);
        });
    }
  }, [cookieUserObjectId]);

  return (
    <StyledMain>
      <StyledH1>User History</StyledH1>
      <StyledSection1>
        {history.length === 0 ? <div>❗️ No History</div> : <></>}
        {history.map((order) => {
          return (
            <StyledSection2 key={order._id}>
              <StyledLabel2>
                <StyledH2>Status</StyledH2>
                {order.status}
              </StyledLabel2>
              <StyledLabel2>
                <StyledH2>Customer</StyledH2>
                {order.user1_id.userName}
              </StyledLabel2>
              <StyledLabel2>
                <StyledH2>Restaurant</StyledH2>
                {order.user2_id.userName}
              </StyledLabel2>
              <StyledLabel2>
                <StyledH2>Delivery Man</StyledH2>
                {order.user3_id ? order.user3_id.userName : "No Delivery Man!"}
              </StyledLabel2>
              <StyledH2>Ordered Menu</StyledH2>
              <div>
                {order.orderedMenu.map((menuInfo, index) => {
                  return (
                    <div key={index}>
                      <br />
                      <div>{menuInfo.menuName}</div>
                      <div>{menuInfo.menuDescription}</div>
                      <div>{menuInfo.menuPrice} (DEDE)</div>
                    </div>
                  );
                })}
              </div>
              <br />
              {cookieUserType === "1" ? (
                <StyledLabel3>
                  <StyledRadio
                    type="radio"
                    name={order._id}
                    value="Completed"
                    onClick={onStatusHandler}
                  />
                  Completed
                </StyledLabel3>
              ) : (
                <></>
              )}
              {cookieUserType === "2" ? (
                <StyledLabel4>
                  <StyledLabel3>
                    <StyledRadio
                      type="radio"
                      name={order._id}
                      value="Cooking"
                      onClick={onStatusHandler}
                    />
                    Cooking
                  </StyledLabel3>
                  <StyledLabel3>
                    <StyledRadio
                      type="radio"
                      name={order._id}
                      value="Rejected"
                      onClick={onStatusHandler}
                    />
                    Reject
                  </StyledLabel3>
                </StyledLabel4>
              ) : (
                <></>
              )}
              <StyledButton onClick={onSubmitHandler}>Submit</StyledButton>
            </StyledSection2>
          );
        })}
      </StyledSection1>
    </StyledMain>
  );
};

export default History;
