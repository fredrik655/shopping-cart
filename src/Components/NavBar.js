import React from "react";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  return (
    <header>
      <ul className="nav-list">
        <Link to={`${process.env.PUBLIC_URL}/`} id="home"style={{ textDecoration: 'none' }}>
          <li className="nav-list-item">Home</li>
        </Link>
        <Link to={`${process.env.PUBLIC_URL}/Shop`} style={{ textDecoration: 'none' }}>
          <li className="nav-list-item">Shop</li>
        </Link>
        <Link to={`${process.env.PUBLIC_URL}/Checkout`} style={{ textDecoration: 'none' }}>
          <li className="nav-list-item">Checkout ({props.numberOfCheckoutItems})</li>
        </Link>
      </ul>
    </header>
  );
};

export default NavBar;
