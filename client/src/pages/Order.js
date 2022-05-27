import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Order = ({ userObjectId }) => {
  const { restaurantObjectId } = useParams();
  const [menus, setMenus] = useState([]);
  const [checkedMenu, setCheckedMenu] = useState([]);
  const {kakao} = window;

  const onCheckHandler = (e) => {
	let newCheckedMenu = checkedMenu.filter((menu) => {
	  if (menu !== e.currentTarget.value) {
		return menu;
	  }
	});

	if (e.currentTarget.checked) {
	  return setCheckedMenu([...checkedMenu, e.currentTarget.value]);
	}

	return setCheckedMenu(newCheckedMenu);
  };

  const onOrderHandler = async (e) => {
	let orderedMenu = [];

	checkedMenu.map((menuObjectId) => {
	  menus.map((menu) => {
		if (menu._id === menuObjectId) {
		  orderedMenu.push({
			menuName: menu.menuName,
			menuDescription: menu.menuDescription,
			menuPrice: menu.menuPrice,
		  });
		}
	  });
	});

	console.log("orderedMenu", orderedMenu);

	const customerRes = await axios.get(`/users/address/${userObjectId}`);
	const restaurantRes = await axios.get(`/users/address/${restaurantObjectId}`);
	const customerAddr = customerRes.data.address;
	const restaurantAddr = restaurantRes.data.address;

	const addressSearch = (addr) => {
	  const geocoder = new kakao.maps.services.Geocoder();

	  return new Promise((resolve, reject) => {
		geocoder.addressSearch(addr, result => {
		  resolve(result);
		});
	  });
	}

	const coord1 = await addressSearch(customerAddr);
	const coord2 = await addressSearch(restaurantAddr);
	const x1 = coord1[0].x;
	const y1 = coord1[0].y;
	const x2 = coord2[0].x;
	const y2 = coord2[0].y;
	const polyline = new kakao.maps.Polyline({
	  path: [new kakao.maps.LatLng(Number(x1), Number(y1)), new kakao.maps.LatLng(Number(x2), Number(y2))]
	});
	const distance = polyline.getLength();

	let body = {
	  customerObjectId: userObjectId,
	  restaurantObjectId,
	  orderedMenu,
	  distance
	};

	await axios.post("/orders", body);
  };

  useEffect(() => {
	axios
	  .get(`/restaurants/${restaurantObjectId}/menus`)
	  .then((res) => {
		const data = res.data.menuList;

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
			  name="menuInfo"
			  value={menu._id}
			  onChange={onCheckHandler}
			/>
		  </div>
		);
	  })}
	  <br />
	  <p>
		<button type="submit" value="Submit" onClick={onOrderHandler}>
		  Order
		</button>
	  </p>
	  <br />
	  <div>
		<Link to={`/restaurants/${restaurantObjectId}/nfts`}>Buy NFT</Link>
	  </div>
	</>
  );
};

export default Order;
