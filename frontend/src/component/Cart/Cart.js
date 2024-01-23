import React, { useState, Fragment } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemFromCart } from "../../actions/cartAction";
import ScrollToTop from "../layout/ScrollToTop";
import { useNavigate, Link } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.user);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };
  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };
  const removeItem = (id) => {
    dispatch(removeItemFromCart(id));
  };

  return (
    <Fragment>
      <ScrollToTop />
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>No items added</p>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>subTotal</p>
            </div>
            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartItemCard item={item} removeItem={removeItem} />
                  <div className="cartInput">
                    <div class="quantity">
                      <button
                        class="minus-btn"
                        type="button"
                        onClick={() =>
                          decreaseQuantity(item.product, item.quantity)
                        }
                      >
                        <RemoveIcon />
                      </button>
                      <input type="text" value={item.quantity} />
                      <button
                        class="plus-btn"
                        type="button"
                        onClick={() =>
                          increaseQuantity(
                            item.product,
                            item.quantity,
                            item.stock
                          )
                        }
                      >
                        <AddIcon />
                      </button>
                    </div>
                  </div>
                  <p className="cartSubtotal">{`₹${
                    item.price * item.quantity
                  }`}</p>
                </div>
              ))}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Total:</p>
                <p className="Tprice">{`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <Link to="/shipping">
                  <button className="Btn1">Check Out</button>
                </Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default Cart;
