import React, { useState, useEffect } from "react";
import axios from "axios";
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
  margin-bottom: 20px;
`;

const StyledSection1 = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 480px;
  border-top: 1px solid rgb(0, 194, 189);
`;

const StyledSection2 = styled.section`
  width: 100%;
  margin: 40px 0 0 0;
  border: 1px solid rgb(0, 194, 189);
  border-radius: 20px;

  &:hover {
    background: rgb(0, 194, 189);
    opacity: 0.4;
  }

  &:active {
    background: rgb(0, 194, 189);
    opacity: 0.6;
  }
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

const StyledLabel = styled.label`
  margin-bottom: 3px;
`;

const Restaurant = () => {
  const cookies = new Cookies();
  const [restaurants, setRestaurants] = useState([]);
  const cookieSigungu = cookies.get("sigungu");

  useEffect(() => {
    axios
      .get("/restaurants")
      .then((res) => {
        let data = res.data;

        if (cookieSigungu) {
          data = data.filter(
            (restaurant) => restaurant.sigungu === cookieSigungu
          );
        }

        console.log("data:", data);

        setRestaurants(data);
      })
      .catch((error) => {
        console.log("❌ Client Get Restaurants Error:", error);
      });
  }, []);

  return (
    <StyledMain>
      <StyledH1>Restaurants</StyledH1>
      <StyledSection1>
        {restaurants.map((restaurant) => {
          return (
            <StyledSection2 key={restaurant._id}>
              <StyledLink to={`/restaurants/${restaurant._id}/menus`}>
                <StyledH2>{restaurant.userName}</StyledH2>
                <StyledLabel>{restaurant.roadNameAddress}</StyledLabel>
                <StyledLabel>{restaurant.phoneNumber}</StyledLabel>
              </StyledLink>
            </StyledSection2>
          );
        })}
      </StyledSection1>
    </StyledMain>
  );
};

export default Restaurant;
