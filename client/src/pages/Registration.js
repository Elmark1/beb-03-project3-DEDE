import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";

const Registration = ({ isSignedIn, userType, userObjectId }) => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [registerType, setRegisterType] = useState();
  const [name, setName] = useState("");
  const [discountRate, setDiscountRate] = useState(0);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const cookieIsSignedIn = cookies.get("isSignedIn");
  const cookieUserType = cookies.get("userType");

  const onRegisterTypeHandler = (e) => {
    e.preventDefault();
    setRegisterType(e.currentTarget.value);
  };

  const onNameHandler = (e) => {
    e.preventDefault();
    setName(e.currentTarget.value);
  };

  const onDiscountRateHandler = (e) => {
    e.preventDefault();
    setDiscountRate(e.currentTarget.value);
  };

  const onDescriptionHandler = (e) => {
    e.preventDefault();
    setDescription(e.currentTarget.value);
  };

  const onPriceHandler = (e) => {
    e.preventDefault();
    setPrice(e.currentTarget.value);
  };

  const onSubmitHandler = () => {
    if (!registerType) {
      return alert("❗️ 등록 타입을 선택해주세요!");
    }

    if (registerType === "menu") {
      if (!name || !description || !price) {
        return alert("❗️ 등록 정보를 모두 작성해주세요!");
      }

      let body = {
        menuName: name,
        menuDescription: description,
        menuPrice: price,
      };

      axios.post(`/restaurants/${userObjectId}/menus`, body).then((res) => {
        console.log("res.data:", res.data);

        alert(`✅ 등록이 완료되었습니다!`);
      });

      return navigate("/registration");
    }

    if (registerType === "nft") {
      if (!name || !discountRate || !price) {
        return alert("❗️ 등록 정보를 모두 작성해주세요!");
      }

      let body = {
        nftName: name,
        discountRate,
        nftPrice: price,
      };

      axios.post(`/restaurants/${userObjectId}/nfts`, body).then((res) => {
        console.log("res.data:", res.data);

        alert(`✅ 등록이 완료되었습니다!`);
      });

      return navigate("/registration");
    }

    alert("❌ 등록할 수 없습니다!");

    return navigate("/mypage");
  };

  useEffect(() => {
    if (!cookieIsSignedIn || cookieUserType !== "2") {
      alert("❌ 제한된 기능입니다!");

      return navigate("/mypage");
    }
  });

  return (
    <div>
      <label>
        <input
          type="radio"
          name="registerType"
          value="menu"
          onChange={onRegisterTypeHandler}
        />
        MENU
      </label>
      <label>
        <input
          type="radio"
          name="registerType"
          value="nft"
          onChange={onRegisterTypeHandler}
        />
        NFT
      </label>
      <br />
      <br />
      <div>Name</div>
      <input name="name" placeholder="Name" onChange={onNameHandler} />
      {registerType === "nft" ? (
        <label>
          Discount Rate (%)
          <input
            name="nftDiscountRate"
            placeholder="Discount Rate (%)"
            onChange={onDiscountRateHandler}
          />
        </label>
      ) : (
        <label>
          Description
          <input
            name="menuDescription"
            placeholder="Description"
            onChange={onDescriptionHandler}
          />
        </label>
      )}
      <div>Price (DEDE)</div>
      <input
        name="price"
        placeholder="Price (DEDE)"
        onChange={onPriceHandler}
      />
      <p>
        <button type="submit" value="Submit" onClick={onSubmitHandler}>
          Submit
        </button>
      </p>
    </div>
  );
};

export default Registration;
