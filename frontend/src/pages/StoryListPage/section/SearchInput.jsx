// import React from "react";
import { useState } from "react";
import "../styles/PostSearch.scss";
import { FaSearch } from "react-icons/fa";
import PropTypes from "prop-types";
const SearchInput = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = (e) => {
    setSearchValue(e.currentTarget.value);
  };
  const handleSearchButtonClick = () => {
    onSearch(searchValue);
  };
  const handleKeyPress = (e) => {
    if (e.key == "Enter") {
      onSearch(searchValue);
    }
    setSearchValue;
  };
  return (
    <div className="search-section">
      <div className="input-section">
        <input
          type="text"
          value={searchValue}
          onChange={handleSearch}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div className="button-section">
        <button onClick={handleSearchButtonClick}>
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

SearchInput.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchInput;
