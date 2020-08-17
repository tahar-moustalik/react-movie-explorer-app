import React from "react";
import "../styles/MovieSearchInput.css";
export default function MovieSearchInput({ onSearch, searchValue }) {
  return (
    <div className="inputWrapper">
      <input
        type="search"
        value={searchValue}
        placeholder="Search a Movie"
        className="searchInput"
        onChange={onSearch}
      />
    </div>
  );
}
