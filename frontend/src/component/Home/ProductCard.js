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
      <div className="product-card ">
        <div className="product-card-thumb">
          <img src={product.images[0].url} alt="Product Thumbnail" />
        </div>
        <div className="product-card-details">
          <div className="product-card-top">
            <span className="product-card-category">{product.category}</span>
            <ReactStars {...options} />
          </div>
          <h4>
            <a href="#">{product.name}</a>
          </h4>

          <div className="product-card-bottom-details">
            <div className="product-card-price">₹ {product.price}</div>

            <a href="#" className="product-card-cart">
              <i>
                <ShoppingCartIcon />
              </i>
            </a>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Product;
