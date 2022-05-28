import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
  margin-bottom: 16px;
`;

const StyledSection2 = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 40px 0 0 0;
  padding: 26px;
  border: 1px solid rgb(0, 194, 189);
  border-radius: 20px;
  position: relative;

  &:hover {
    color: white;
    background: rgb(0, 194, 189);
    opacity: 0.4;
  }

  &:active {
    color: white;
    background: rgb(0, 194, 189);
    opacity: 0.6;
  }
`;

const StyledCheckbox = styled.input`
  text-decoration: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 480px;
  height: 100%;
  border: 1px solid rgb(0, 194, 189);
  border-radius: 20px;
  opacity: 0;

  &:checked {
    opacity: 0.1;
  }
`;

const StyledLabel = styled.label`
  margin-bottom: 3px;
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

const StyledLink = styled(Link)`
  color: #00c2bd;
  margin: 15px;
`;

const Order = ({ userObjectId }) => {
  const { restaurantObjectId } = useParams();
  const [menus, setMenus] = useState([]);
  const [checkedMenu, setCheckedMenu] = useState([]);
  const { kakao } = window;

  const onCheckHandler = (e) => {
    let newCheckedMenu = checkedMenu.filter((menu) => {
      if (menu !== e.currentTarget.value) {
        return menu;
      }
    });

    if (e.currentTarget.checked) {
      console.log("newCheckedMenu:", e.currentTarget.value);

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
    const restaurantRes = await axios.get(
      `/users/address/${restaurantObjectId}`
    );
    const customerAddr = customerRes.data.address;
    const restaurantAddr = restaurantRes.data.address;

    const addressSearch = (addr) => {
      const geocoder = new kakao.maps.services.Geocoder();

      return new Promise((resolve, reject) => {
        geocoder.addressSearch(addr, (result) => {
          resolve(result);
        });
      });
    };

    const coord1 = await addressSearch(customerAddr);
    const coord2 = await addressSearch(restaurantAddr);
    const x1 = coord1[0].x;
    const y1 = coord1[0].y;
    const x2 = coord2[0].x;
    const y2 = coord2[0].y;
    const polyline = new kakao.maps.Polyline({
      path: [
        new kakao.maps.LatLng(Number(x1), Number(y1)),
        new kakao.maps.LatLng(Number(x2), Number(y2)),
      ],
    });
    const distance = polyline.getLength();

    let body = {
      customerObjectId: userObjectId,
      restaurantObjectId,
      orderedMenu,
      distance,
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
    <StyledMain>
      <StyledH1>Menus</StyledH1>
      <StyledSection1>
        {menus.map((menu) => {
          return (
            <StyledSection2 key={menu._id}>
              <StyledH2>{menu.menuName}</StyledH2>
              <StyledLabel>{menu.menuDescription}</StyledLabel>
              <StyledLabel>{menu.menuPrice} (DEDE)</StyledLabel>
              <StyledCheckbox
                className="checkedMenu"
                type="checkbox"
                name="menuInfo"
                value={menu._id}
                onChange={onCheckHandler}
              />
            </StyledSection2>
          );
        })}
      </StyledSection1>
      <StyledButton type="submit" value="Submit" onClick={onOrderHandler}>
        Order
      </StyledButton>
      <StyledLink to={`/restaurants/${restaurantObjectId}/nfts`}>
        Buy NFT
      </StyledLink>
    </StyledMain>
  );
};

export default Order;
