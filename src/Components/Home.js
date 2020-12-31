import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container" >
      <div className="title-container">
      <h1>
        Welcome to the
      </h1>
      <h1 id="inner">
        "Fortnite"
      </h1>
      <h1>
        item Shop
      </h1>
    </div>
      
      <Link to={`${process.env.PUBLIC_URL}/Shop`}>
        <button id="shop-button"> GO TO SHOP</button>
      </Link>
    </div>
  );
};

export default Home;
