import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Product = ({ product }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: 20,
    value: product.ratings,
    isHalf: "true",
  };
  return (
    <Link to={`/product/${product._id}`}>
      <div className="product-card">
        <img src={product.images[0].url} alt="" />

        <h4>{product.name}</h4>

        <ReactStars {...options} />
        <p>₹{product.price}</p>
      </div>
    </Link>
  );
};

export default Product;
