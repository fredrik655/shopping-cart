import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";

const Checkout = (props) => {
  const generateContent = () => {
    return (
      props.items.map(element => {
        return (
        <li key={`${element.id}checkout`}>Name: {element.name}, Total: {element.numberOf}, Price: {element.price*element.numberOf}</li>
        );
      })
    );
  };

  const returnTotalPrice = () => {
    let totalPrice = 0;
    props.items.forEach(element => {
      totalPrice += element.price*element.numberOf;
    });
    return totalPrice;
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <ul>
        {generateContent()}
      </ul>
      <p>Total Price: {returnTotalPrice()}</p>
      <button id="order-submit">Process Order</button>
    </div>
  );
};

export default Checkout;
