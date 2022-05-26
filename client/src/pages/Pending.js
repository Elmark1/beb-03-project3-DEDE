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
        .then((res) => {
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
            <div>Restaurant</div>
            <div>{order.user2_id.userName}</div>
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
