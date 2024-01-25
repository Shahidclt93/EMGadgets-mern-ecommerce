import React, { useState, Fragment } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import emgadgetLogo from "../../../images/emgadgets-logo.png";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { toast } from 'react-toastify';
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  function logoutUser() {
    dispatch(logout());
    toast.success("logout successfully");
  }
  const categories = ["Headphones", "Watches", "Gadgets", "Mobile Accessories"];

  return (
    <Fragment>
      <header className="header">
        <i id="menu-btn" onClick={navbarToggle}>
          <MenuIcon style={{ fontSize: "40px", height: "70px" }} />
        </i>
        <Link to="/">
          <img className="logo" src={emgadgetLogo} />
        </Link>

        <nav className={navbarOpen ? "navbar active" : "navbar"}>
          <i className="navbar-closeBtn" onClick={navbarToggle}>
            <CloseIcon style={{ fontSize: "2rem" }} />
          </i>
          <ul className="navbar-items">
            <Link to="/">
              <li className="nav-item">
                <a>Home</a>
              </li>
            </Link>
            <div className="nav-dropdown">
              <li
                className="nav-item"
                id="products-dropdown"
                onClick={() => navigate("/products")}
              >
                Products <ExpandMoreIcon />
              </li>
              <Link to="/products">
                <li className="nav-item" id="products-direct">
                  Products
                </li>
              </Link>
              <li className="products-dropdown">
                <ul className="category-options">
                  {categories.map((category) => (
                    <li
                      onClick={() =>
                        navigate(`/products/&category=${category}`)
                      }
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </li>
            </div>
            <Link to="/pages">
              <li className="nav-item">
                <a>Pages</a>
              </li>
            </Link>
            <Link to="/about">
              <li className="nav-item">
                <a>About</a>
              </li>
            </Link>
            <Link to="/contacts">
              <li className="nav-item">
                <a>Contact</a>
              </li>
            </Link>
          </ul>

          {!isAuthenticated && (
            <Link to="/login" className="login-navbar">
              Login/Register
            </Link>
          )}
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
            <div
              className={`loggedIn-select-menu ${
                dropDownActive ? "active" : ""
              }`}
            >
              <div className="loggedIn-select-btn" onClick={toggleUserDropDown}>
                <AccountCircleSharpIcon />
                <span className="sBtn-text">
                  {isAuthenticated && user.role === "user" ? "User" : "Admin"}
                </span>
                <i className="arrow-down">
                  <KeyboardArrowDownIcon />
                </i>
              </div>
              <ul className="loggedIn-options">
                {user.role === "admin" && (
                  <Link to="/admin/dashboard">
                    <li className="loggedIn-option">
                      <i style={{ color: "#266060" }}>
                        <DashboardIcon />
                      </i>
                      <span className="loggedIn-option-text">Dashboard</span>
                    </li>
                  </Link>
                )}

                <Link to="/orders">
                  <li className="loggedIn-option">
                    <i style={{ color: "#266060" }}>
                      <ListAltIcon />
                    </i>
                    <span className="loggedIn-option-text">My Orders</span>
                  </li>
                </Link>
                <Link to="/account">
                  <li className="loggedIn-option">
                    <i style={{ color: "#E1306C" }}>
                      <PersonIcon />
                    </i>
                    <span className="loggedIn-option-text">Profile</span>
                  </li>
                </Link>

                <li className="loggedIn-option">
                  <i style={{ color: "#0E76A8" }}>
                    <ExitToAppIcon />
                  </i>
                  <span className="loggedIn-option-text" onClick={logoutUser}>
                    LogOut
                  </span>
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
