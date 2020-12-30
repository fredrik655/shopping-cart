import React from "react";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  return (
    <header>
      <ul className="nav-list">
        <Link to="/" id="home"style={{ textDecoration: 'none' }}>
          <li className="nav-list-item">Home</li>
        </Link>
        <Link to="/Shop" style={{ textDecoration: 'none' }}>
          <li className="nav-list-item">Shop</li>
        </Link>
        <Link to="/Checkout" style={{ textDecoration: 'none' }}>
          <li className="nav-list-item">Checkout ({props.numberOfCheckoutItems})</li>
        </Link>
      </ul>
    </header>
  );
};

export default NavBar;
