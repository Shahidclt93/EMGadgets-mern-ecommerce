import React, { useState, Fragment, useEffect } from "react";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { Button } from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import Sidebar from "../Admin/Sidebar";
import { Typography } from "@mui/material";
import { toast } from 'react-toastify';

import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstant";

const ProcessOrder = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { isUpdated, error: updateError } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);

  const [status, setStatus] = useState("");

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("status", status);

    dispatch(updateOrder(params.id, myForm));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Order Updated");
      navigate("/admin/orders");

      dispatch({ type: UPDATE_ORDER_RESET });
    }
    

    dispatch(getOrderDetails(params.id));
  }, [dispatch, toast, error, params.id, isUpdated, updateError]);
  return (
    <Fragment>
      <MetaData title="Process order" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer ">
          {loading ? (
            <Loader />
          ) : (
            <div className="confirmOrderPage ">
              <div>
                <div className="confirmShippingArea">
                  <Typography>Shipping Info</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Name:</p>
                      <span>{order.user && order.user.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="processOrderPage">
                  <Typography>Payment</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        style={{
                          color:
                            order.paymentInfo &&
                            order.paymentInfo.status === "succeeded"
                              ? "green"
                              : "red",
                        }}
                      >
                        {order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>

                    <div className="payment-info">
                      <p>Amount:</p>
                      <span>₹{order.totalPrice && order.totalPrice}</span>
                    </div>
                  </div>

                  <Typography>Order Status</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        style={{
                          color:
                            order.orderStatus &&
                            order.orderStatus === "Delivered"
                              ? "green"
                              : "red",
                        }}
                      >
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="confirmCartItems">
                  <Typography>Your Cart Items</Typography>
                  <div className="confirmCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/Product/${item.product}`}>
                            {item.name}
                          </Link>
                          <span>
                            {item.quantity} X ₹{item.price} =
                            <b>₹{item.price * item.quantity}</b>{" "}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div style={{display: order.orderStatus === "Delivered" ? "none":"block"}}>
                <form
                  className="createProductContainer"
                  encType="multipart/form-data"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {order.orderStatus === "Processing" ? (
                        <option value="Shipped">Shipped</option>
                      ) : (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Update
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
