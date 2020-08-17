import React from "react";
import "../styles/NavBar.css";

export default function NavBar(props) {
  return (
    <nav className="navBar">
      <h1>Movie Explorer</h1>
      <label className="switch">
        <input type="checkbox" onClick={props.toggleColorScheme} />
        <span className="slider round"></span>
      </label>
    </nav>
  );
}
