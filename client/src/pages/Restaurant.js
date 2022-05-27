import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";

const Restaurant = () => {
  const cookies = new Cookies();
  const [restaurants, setRestaurants] = useState([]);
  const cookieSigungu = cookies.get("sigungu");

  useEffect(() => {
    axios
      .get("http://localhost:4000/restaurants")
      .then((res) => {
        const data = res.data;

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
    <>
      {restaurants.map((restaurant) => {
        return (
          <div key={restaurant._id}>
            <Link to={`/restaurants/${restaurant._id}/menus`}>
              <br />
              <div>{restaurant.userName}</div>
              <div>{restaurant.roadNameAddress}</div>
              <div>{restaurant.phoneNumber}</div>
              <br />
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default Restaurant;
