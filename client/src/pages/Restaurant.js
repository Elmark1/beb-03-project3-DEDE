import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Restaurant = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/restaurants")
      .then((res) => {
        const data = res.data;
        console.log(data);
        setRestaurants(data);
      })
      .catch((error) => {
        console.log("❌ ClientGetRestaurantsError:", error);
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
