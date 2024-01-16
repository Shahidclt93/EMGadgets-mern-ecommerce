import React, { useState, Fragment } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useAsyncError, useNavigate } from "react-router-dom";
import { logout } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import SearchIcon from "@mui/icons-material/Search";
import { SpeedDial, SpeedDialAction, Backdrop } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CloseIcon from "@mui/icons-material/Close";

const Header = () => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const options = [
    {
      icon: (
        <Link to="/orders">
          <ListAltIcon />
        </Link>
      ),
      name: "Orders",
    },
    {
      icon: (
        <Link to="/account">
          <PersonIcon />
        </Link>
      ),
      name: "Profile",
    },
    {
      icon: (
        <Link to="/cart">
          <ShoppingCartOutlinedIcon />
        </Link>
      ),
      name: `Cart (${cartItems.length})`,
    },
    { icon: <ExitToAppIcon />, name: "Logout", Func: logoutUser },
  ];

  

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);

  const [keyword, setKeyword] = useState("");
  const [dropDownActive, setDropDownActive] = useState(false);
  const toggleUserDropDown = () => {
    setDropDownActive(!dropDownActive);
  };
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  const navbarToggle = () => {
    setNavbarOpen(!navbarOpen);
  };
  function logoutUser () {
    dispatch(logout());
    alert.success("logout successfully");
  }

  return (
    <Fragment>
      <header className="header">
      <i id="menu-btn" onClick={navbarToggle}>
            <MenuIcon style={{ fontSize: "40px" ,height:"70px" }} />
          </i>
        <Link to="/">
          <a className="logo">
            EmGadgets
          </a>
        </Link>

        <nav className={navbarOpen ? "navbar active" : "navbar"}>
          <i className="navbar-closeBtn" onClick={navbarToggle}>
            <CloseIcon style={{ fontSize: "2rem" }} />
          </i>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/pages">Pages</Link>
          <Link to="/contacts">Contacts</Link>
          <Link to="/about">About</Link>
          {!isAuthenticated &&
          <Link to="/login" className="login-navbar">
              Login/Register
            </Link>
          }
        </nav>
        <div className="header-icons">
          {
            <Link to="/login">
              <a
                className="login-reg-link"
                style={{ display: isAuthenticated && "none" }}
              >
                Login/Register
              </a>
            </Link>
          }
          <i id="search-btn" onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <SearchIcon />
          </i>
          <Link to="/cart">
            <i id="cart-btn">
              <ShoppingCartOutlinedIcon />

              <span>{cartItems.length}</span>
            </i>
          </Link>
          {isAuthenticated && (
            <div className={`select-menu ${dropDownActive ? "active" : ""}`}>
              <div className="select-btn" onClick={toggleUserDropDown}>
                <AccountCircleSharpIcon />
                <span className="sBtn-text">{isAuthenticated && user.role === "user" ? "User" : "Admin" }</span>
                <i className="arrow-down">
                  <KeyboardArrowDownIcon />
                </i>
              </div>
              <ul className="options">
                {
                  user.role ===
                    "admin" &&(
                      <Link to="/admin/dashboard">
                        <li className="option">
                          <i style={{ color: "#266060" }}>
                            <DashboardIcon />
                          </i>
                          <span className="option-text">Dashboard</span>
                        </li>
                      </Link>
                    )}

                <Link to="/orders">
                 
                  <li className="option">
                    <i style={{ color: "#266060" }}>
                      <ListAltIcon />
                    </i>
                    <span className="option-text">My Orders</span>
                  </li>
                </Link>
                <Link to="/account">
                 
                  <li className="option">
                    <i style={{ color: "#E1306C" }}>
                      <PersonIcon />
                    </i>
                    <span className="option-text">Profile</span>
                  </li>
                </Link>
              
              
                  <li className="option">
                    <i style={{ color: "#0E76A8" }}>
                      <ExitToAppIcon />
                    </i>
                    <span className="option-text" onClick={logoutUser}>LogOut</span>
                  </li>
                
              </ul>
            </div>
          )}

          
        </div>
      </header>
      <form
        action=""
        className={isSearchOpen ? " search-form active" : "search-form"}
        onSubmit={searchSubmitHandler}
      >
        <input
          type="text"
          id="search-box"
          placeholder="Search Product..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit">
          <i className="search-icon">
            <SearchIcon />
          </i>
        </button>
      </form>
    </Fragment>
  );
};

export default Header;
