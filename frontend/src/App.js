import React, { useState } from "react";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./component/Home/Home";
import WebFont from "webfontloader";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { useSelector } from "react-redux";
import { loadUser } from "./actions/userAction";
import Profile from "./component/User/Profile";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./component/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import NotFound from "./component/layout/NotFound/NotFound";
import AboutPage from "./component/layout/Header/AboutPage";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const auth = (element) => {
    if (!isAuthenticated) {
      return <Navigate to={"/login"} />;
    } else {
      return element;
    }
  };

  const authAdmin = (element) => {
    if (!isAuthenticated) {
      return <Navigate to={"/login"} />;
    } else {
      if (user.role !== "admin") {
        return <Navigate to={"/account"} />;
      } else {
        return element;
      }
    }
  };

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: [
          "Roboto:300,400,500",
          "Kumbh Sans:200,300,400,500,600",
          "Urbanist:200,300,400,500,600",
        ],
      },
    });
    store.dispatch(loadUser());
    {
      isAuthenticated && getStripeApiKey();
    }
  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Header />
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            <Route path="/process/payment" element={auth(<Payment />)} />
          </Routes>
        </Elements>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/account" element={auth(<Profile />)} />
        <Route path="/me/update" element={auth(<UpdateProfile />)} />
        <Route path="/password/update" element={auth(<UpdatePassword />)} />
        <Route path="/order/confirm" element={auth(<ConfirmOrder />)} />
        <Route path="/shipping" element={auth(<Shipping />)} />
        <Route path="/success" element={auth(<OrderSuccess />)} />
        <Route path="/orders" element={auth(<MyOrders />)} />
        <Route path="/order/:id" element={auth(<OrderDetails />)} />
        <Route path="/admin/dashboard" element={authAdmin(<Dashboard />)} />
        <Route path="/admin/products" element={authAdmin(<ProductList />)} />
        <Route path="/admin/product" element={authAdmin(<NewProduct />)} />

        <Route
          path="/admin/product/:id"
          element={authAdmin(<UpdateProduct />)}
        />
        <Route path="/admin/orders" element={authAdmin(<OrderList />)} />
        <Route path="/admin/order/:id" element={authAdmin(<ProcessOrder />)} />
        <Route path="/admin/users" element={authAdmin(<UsersList />)} />
        <Route path="/admin/user/:id" element={authAdmin(<UpdateUser />)} />
        <Route path="/admin/reviews" element={authAdmin(<ProductReviews />)} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
