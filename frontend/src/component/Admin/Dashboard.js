import React,{useEffect,Fragment} from "react";
import { Typography } from "@mui/material";
import "./Dashboard.css";
import Sidebar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { getAdminProduct } from "../../actions/productAction";
import {  getAllOrders } from "../../actions/orderAction";
import {  getAllUsers } from "../../actions/userAction";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const Dashboard = () => {
  const dispatch = useDispatch()
  const {products} = useSelector((state)=> state.products)
  const {orders} = useSelector((state)=> state.allOrders)
  const {users} = useSelector((state)=> state.allUsers)
  let outOfStock = 0
    products && products.forEach((item) => {
        if (item.Stock === 0) {
          outOfStock += 1;
        }
      });

  useEffect(() => {
   
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0
  orders && orders.forEach((item)=> {
    totalAmount+= item.totalPrice
  })

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["green"],
        hoverBackgroundColor: ["light-green"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["OUT OF STOCK", "INSTOCK"],
    datasets: [
      {
        backgroundColor: ["#FF8C00", "#4B0082"],
        hoverBackgroundColor: ["#FFA500", "#800080"],
        data: products && [outOfStock, products.length - outOfStock],
      },
    ],
  };
  return (
    <Fragment>

    <div className="dashboard">
      <Sidebar />
      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>
       

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ${totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Products</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>
        <div className="lineChart">
          <Line data={lineState} />
        </div>
        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
    
  

    </Fragment>
  );
};
export default Dashboard;
