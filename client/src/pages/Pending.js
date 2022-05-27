import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";

const Pending = () => {
  const cookies = new Cookies();
  const [pending, setPending] = useState([]);
  const [status, setStatus] = useState("");
  const [orderObjectId, setOrderObjectId] = useState("");
  const cookieIsSignedIn = cookies.get("isSignedIn");
  const cookieUserType = cookies.get("userType");
  const cookieUserObjectId = cookies.get("userObjectId");
  const {kakao} = window;

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

		  const coordinates = [];

		  const addressSearch = (addr) => {
			const geocoder = new kakao.maps.services.Geocoder();

			return new Promise((resolve, reject) => {
			  geocoder.addressSearch(addr, result => {
				resolve(result);
			  });
			});
		  }

		  for await(const order of pendingOrder) {
			const coord = await addressSearch(order.user1_id.roadNameAddress);
			const co = await addressSearch(order.user2_id.roadNameAddress);
			const x = coord[0].x;
			const y = coord[0].y;
			const xx = co[0].x;
			const yy = co[0].y;
			console.log(coord);
			console.log(x);
			console.log(y);
			const polyline = new kakao.maps.Polyline({
			  path: [new kakao.maps.LatLng(Number(x), Number(y)), new kakao.maps.LatLng(Number(xx), Number(yy))]
			});
			const dist = polyline.getLength();
			order['distance'] = dist;
		  }

          console.log("pendingOrder:", pendingOrder);

          setPending(pendingOrder);
        })
        .catch((error) => {
          console.log("❌ Client Get Pending Page Error:", error);
        });
    }
  }, [cookieUserObjectId]);

  return (
    <div>
      <br />
      <br />
      <div>Pending Order</div>
      <br />
      {pending.length === 0 ? <div>❗️ No Pending Order</div> : <></>}
      {pending.map((order) => {
        return (
          <div key={order._id}>
            <div>Status</div>
            <div>{order.status}</div>
            <div>Customer</div>
            <div>{order.user1_id.userName}</div>
			<div>Customer Address</div>
			<div>{order.user1_id.roadNameAddress}</div>
            <div>Restaurant</div>
            <div>{order.user2_id.userName}</div>
			<div>Restaurant Address</div>
			<div>{order.user2_id.roadNameAddress}</div>
			<div>Restaurant Staked Token</div>
			<div>{order.user2_id.stakedToken}</div>
			<div>Distance between Customer and Restaurant</div>
			<div>{order.distance}</div>
            <div>Delivery Man</div>
            <div>
              {order.user3_id
                ? order.user3_id.userName
                : "🚴‍♂️ You can deliver it!"}
            </div>
            <div>Ordered Menu</div>
            <div>
              {order.orderedMenu.map((menuInfo, index) => {
                return (
                  <div key={index}>
                    <br />
                    <div>Name</div>
                    <div>{menuInfo.menuName}</div>
                    <div>Description</div>
                    <div>{menuInfo.menuDescription}</div>
                    <div>Price</div>
                    <div>{menuInfo.menuPrice} (DEDE)</div>
                  </div>
                );
              })}
            </div>
            <br />
            {cookieUserType === "3" ? (
              <div>
                <input
                  type="radio"
                  name={order._id}
                  value="Delivery"
                  onClick={onStatusHandler}
                />
                Delivery
              </div>
            ) : (
              <></>
            )}
          </div>
        );
      })}
      {cookieUserType === "3" ? (
        <div>
          <br />
          <button onClick={onSubmitHandler}>Submit</button>
        </div>
      ) : (
        <div>
          <br />
          <Link to="/signin">Please Sign In</Link>
        </div>
      )}
    </div>
  );
};

export default Pending;
