import React from "react";
import "./Search.css";

const Search = () => {
  return (
    <div className="Blockreact searchContainer">
      <input
        type="text"
        id="what-user-search"
        className="form-control input-lg"
        placeholder="식당 이름을 검색해주세요"
      />
    </div>
  );
};

export default Search;
