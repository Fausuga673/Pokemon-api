import React from "react";
import ICON from "../assets/icon.png";

const Header = ({ getPokemons }) => {
  return (
    <header id="header">
      <nav>
        <div className="icon">
          <img src={ICON} alt="" />
          <h1>Pokedex</h1>
        </div>
        <input
          className="searchBar"
          type="text"
          placeholder="Search pokemon"
          onChange={(e) => {
            getPokemons(e.target.value.toLowerCase());
          }}
        />
      </nav>
    </header>
  );
};

export default Header;
