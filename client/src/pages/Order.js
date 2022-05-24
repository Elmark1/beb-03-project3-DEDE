import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Order = ({ userObjectId }) => {
  const { restaurantObjectId } = useParams();
  const [menus, setMenus] = useState([]);
  const [checkedMenu, setCheckedMenu] = useState([]);

  const onCheckHandler = (e) => {
    if (e.currentTarget.checked) {
      setCheckedMenu([...checkedMenu, e.currentTarget.value]);
    }

    setCheckedMenu(
      checkedMenu.filter((menu) => {
        if (menu !== e.currentTarget.value) {
          return menu;
        }
      })
    );
  };

  const onOrderHandler = async (e) => {
    let body = {
      customerObjectId: userObjectId,
      restaurantObjectId,
      orderedMenu: checkedMenu,
    };

    await axios.post("/orders", body);
  };

  useEffect(() => {
    console.log(restaurantObjectId);

    axios
      .get(`/restaurants/${restaurantObjectId}/menus`)
      .then((res) => {
        const data = res.data.menuList; // ⭐️⭐️⭐️⭐️⭐️ server에서 get Menus By Id response를 간단하게 수정할 예정입니다!

        console.log("data:", data);

        setMenus(data);
      })
      .catch((error) => {
        console.log("❌ Client Get Restaurant MenusError:", error);
      });
  }, []);

  return (
    <>
      {menus.map((menu) => {
        return (
          <div key={menu._id}>
            <br />
            <div>{menu.menuName}</div>
            <div>{menu.menuDescription}</div>
            <div>{menu.menuPrice} (DEDE)</div>

            <input
              type="checkbox"
              name="menuId"
              value={menu._id}
              onChange={onCheckHandler}
            />

            <br />
          </div>
        );
      })}
      <p>
        <button type="submit" value="Submit" onClick={onOrderHandler}>
          Submit
        </button>
      </p>
    </>
  );
};

export default Order;
