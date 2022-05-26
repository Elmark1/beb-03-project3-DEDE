import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";

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
    <>
      {cookieIsSignedIn ? (
        <div>
          <br />
          <br />
          <div>User History</div>
          <br />
          {history.length === 0 ? <div>❗️ No History</div> : <></>}
          {history.map((order) => {
            return (
              <div key={order._id}>
                <div>Status</div>
                <div>{order.status}</div>
                <div>Customer</div>
                <div>{order.user1_id}</div>
                <div>Restaurant</div>
                <div>{order.user2_id}</div>
                <div>Delivery Man</div>
                <div>{order.user3_id}</div>
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
                {cookieUserType === 2 ? (
                  <div>
                    <input
                      type="radio"
                      name={order._id}
                      value="Cooking"
                      onClick={onStatusHandler}
                    >
                      Cooking
                    </input>
                    <input
                      type="radio"
                      name={order._id}
                      value="Reject"
                      onClick={onStatusHandler}
                    >
                      Reject
                    </input>
                  </div>
                ) : (
                  <></>
                )}
                {cookieUserType === 3 ? (
                  <div>
                    <input
                      type="radio"
                      name={order._id}
                      value="Delivery"
                      onClick={onStatusHandler}
                    >
                      Delivery
                    </input>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
          {cookieUserType !== 1 ? (
            <div>
              <br />
              <button onClick={onSubmitHandler}>Submit</button>
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div>
          <br />
          <Link to="/signin">Please Sign In</Link>
        </div>
      )}
    </>
  );
};

export default History;
