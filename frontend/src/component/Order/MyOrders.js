import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { Link, useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { clearErrors, myOrders } from "../../actions/orderAction";
import "./MyOrders.css";
import { Fragment } from "react";

const MyOrders = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, toast, error]);

  return (
    <Fragment>
      <MetaData title={`${user.name} - Orders`} />
      {loading ? (
        <Loader />
      ) : (
        <div>
          {orders && orders.length === 0 ? (
            <div className="empty-cart">
              <p>No items added</p>
            </div>
          ) : (
            <div className="my-orders">
              <h1 className="my-orders-h1">My Orders</h1>
              <table>
                <thead>
                  <tr>
                    <th>Items</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <a>{item._id}</a>
                      </td>
                      <td>
                        <a>{item.orderItems.length}</a>
                      </td>
                      <td>
                        <a>₹{item.totalPrice}</a>
                      </td>
                      <td>
                        <a
                          className={`status-badge ${
                            item.orderStatus === "Delivered"
                              ? "delivered"
                              : "processing"
                          }`}
                        >
                          {item.orderStatus}
                        </a>
                      </td>
                      <td>
                        <Link to={`/order/${item._id}`}>
                          <a className="status-badge info">Info</a>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
