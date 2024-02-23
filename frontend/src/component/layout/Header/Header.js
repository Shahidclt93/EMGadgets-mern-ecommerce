import React, { useState, Fragment } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import emgadgetLogo from "../../../images/emgadgets-logo.png";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { toast } from "react-toastify";
import { CgMenuLeft } from "react-icons/cg";
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
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  const navbarToggle = () => {
    if (window.innerWidth < 890) {
      setNavbarOpen(!navbarOpen);
    }
  };
  function logoutUser() {
    dispatch(logout());
    toast.success("logout successfully");
  }

  const categories = ["Smartphones", "Headphones", "Watches", "Gadgets"];

  return (
    <Fragment>
      <header className="header">
        <i id="menu-btn" onClick={navbarToggle}>
          <CgMenuLeft style={{ fontSize: "30px", color: "#000" }} />
        </i>
        <Link to="/">
          <img className="logo" src={emgadgetLogo} />
        </Link>

        <nav className={navbarOpen ? "navbar active" : "navbar"}>
          <i className="navbar-closeBtn">
            <CloseIcon style={{ fontSize: "2rem" }} onClick={navbarToggle} />
          </i>
          <ul className="navbar-items">
            {!isAuthenticated && (
              <Link to="/login" className="login-navbar">
                <li className="nav-item" onClick={navbarToggle}>
                  Create Account{" "}
                </li>
              </Link>
            )}
            <Link to="/">
              <li className="nav-item" onClick={navbarToggle}>
                <a>Home</a>
              </li>
            </Link>
            <div className="nav-dropdown">
              <Link to="/products">
              <li className="nav-item" id="products-dropdown">
                Products <ExpandMoreIcon />
              </li>
              </Link>
              <Link to="/products">
                <li
                  className="nav-item"
                  id="products-direct"
                  onClick={navbarToggle}
                >
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
            <li className="nav-item" onClick={navbarToggle}>
              <a style={{ color: "inherit" }} href="#pages">
                Pages
              </a>
            </li>
            <Link to="/about">
              <li className="nav-item" onClick={navbarToggle}>
                About
              </li>
            </Link>
            <li className="nav-item" onClick={navbarToggle}>
              <a style={{ color: "inherit" }} href="#contact">
                Contact
              </a>
            </li>
          </ul>
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
                    <li
                      className="loggedIn-option"
                      onClick={toggleUserDropDown}
                    >
                      <i style={{ color: "#266060" }}>
                        <DashboardIcon />
                      </i>
                      <span className="loggedIn-option-text">Dashboard</span>
                    </li>
                  </Link>
                )}

                <Link to="/orders">
                  <li className="loggedIn-option" onClick={toggleUserDropDown}>
                    <i style={{ color: "#266060" }}>
                      <ListAltIcon />
                    </i>
                    <span className="loggedIn-option-text">My Orders</span>
                  </li>
                </Link>
                <Link to="/account">
                  <li className="loggedIn-option" onClick={toggleUserDropDown}>
                    <i style={{ color: "#E1306C" }}>
                      <PersonIcon />
                    </i>
                    <span className="loggedIn-option-text">Profile</span>
                  </li>
                </Link>

                <li
                  className="loggedIn-option"
                  onClick={() => {
                    logoutUser();
                    toggleUserDropDown();
                  }}
                >
                  <i style={{ color: "#0E76A8" }}>
                    <ExitToAppIcon />
                  </i>
                  <span className="loggedIn-option-text">LogOut</span>
                </li>
              </ul>
            </div>
          )}
        </div>
        <section
          className={`navbar-overlay overlay ${navbarOpen ? "active" : ""}`}
          onClick={navbarToggle}
        ></section>
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
