import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link, useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { clearErrors, myOrders } from "../../actions/orderAction";

import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBTable } from "mdbreact";
import "./MyOrders.css";
import { Fragment } from "react";

const  MyOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const params = useParams();
  const id = params.id;

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    } 

    dispatch(myOrders());
  }, [dispatch, alert, error]);

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
                    <a>{item.totalPrice}</a>
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
                      <td className="status-badge info">
                        <a>Info</a>
                      </td>
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
}

export default MyOrders;

          // <MDBContainer>
          //   <MDBRow>
          //     <MDBCol md="12">
          //       <h1 className="order-heading">My Orders</h1>
          //     </MDBCol>
          //   </MDBRow>
          //   <MDBRow>
          //     <MDBCol md="12" className="table-container">
          //       <div className="table-wrapper">
          //         <MDBTable striped bordered hover className="myTable">
          //           <thead>
          //             <tr>
          //               <th>Order ID</th>

          //               <th>Status</th>
          //               <th>Quantity</th>
          //               <th>Amount</th>
          //               <th>Actions</th>
          //             </tr>
          //           </thead>
          //           <tbody>
          //             {orders &&
          //               orders.map((item, index) => (
          //                 <tr key={index}>
          //                   <td>{item._id}</td>
          //                   {/* <td>{item.name}</td> */}

          //                   <span
          //                     className={`status-badge ${item.orderStatus.toLowerCase()}`}
          //                   >
          //                     <td>{item.orderStatus}</td>
          //                   </span>
          //                   <td>{item.orderItems.length}</td>
          //                   <td>${item.totalPrice}</td>
          //                   <span
          //                     className={`status-badge ${
          //                       item.orderStatus === "Delivered"
          //                         ? "Completed".toLowerCase()
          //                         : "Cancel".toLowerCase()
          //                     }`}
          //                   >
          //                     <td>
          //                       {" "}
          //                       <Link to={`/order/${item._id}`}>
          //                         {item.orderStatus === "Delivered" ? (
          //                           <td>Completed</td>
          //                         ) : (
          //                           <td>Cancel</td>
          //                         )}
          //                       </Link>
          //                     </td>
          //                   </span>
          //                 </tr>
          //               ))}
          //           </tbody>
          //         </MDBTable>
          //       </div>
          //     </MDBCol>
          //   </MDBRow>
          // </MDBContainer>