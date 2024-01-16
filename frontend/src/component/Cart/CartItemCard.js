import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, removeItem }) => {
  return (
    <div className="cardItemCard">
      <img src={item.image} alt="item-img" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`price: $${item.price}`}</span>
        <p onClick={() => removeItem(item.product)}>remove Item</p>
      </div>
    </div>
  );
};
export default CartItemCard;
