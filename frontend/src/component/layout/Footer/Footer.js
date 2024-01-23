import React from "react";
import "./Footer.css";
import { useNavigate } from "react-router-dom";
import Logo from "../../../images/emgadgets-logo.png";
import paymentImg from "../../../images/payment-img.png";

function Footer() {
  const categories = ["Headphones", "Watches", "Gadgets", "Mobile Accessories"];

  const navigate = useNavigate();
  return (
    <section className="footer" id="contact">
      <div className="footer-items">
        <div className="footer-logo">
          <img src={Logo} />
          <p>
            Explore cutting-edge gadgets that seamlessly blend style and
            functionality in our online store.
          </p>
        </div>
        <div className="box-container">
          <div className="box">
            <h3>Products</h3>
            {categories.map((category) => (
              <a
                href="#"
                className="links"
                onClick={() => navigate(`/products/&category=${category}`)}
              >
                {category}
              </a>
            ))}
          </div>
          <div className="box">
            <h3>Quick links</h3>
            <a href="#" onClick={() => navigate("/")}>
              Home
            </a>
            <a href="#">About</a>
            <a href="#">Popular</a>
            <a href="#">FAQ Information</a>
          </div>
          <div className="box">
            <h3>Contact </h3>
            <a href="#" className="links">
              <i className="fas fa-phone"></i> +918345678915
            </a>
            <a href="#" className="links">
              <i className="fas fa-envelope"></i> emgadg43@gmail.com
            </a>
            <a href="#" className="links">
              <i className="fas fa-location-arrow"></i> kerala,india
            </a>
          </div>
        </div>
      </div>
      <div className="line"></div>
      <div className="subs-container">
        <div className="social-media-icons">
          <a href="#" className="fab fa-facebook-f"></a>
          <a href="#" className="fab fa-twitter"></a>
          <a href="#" className="fab fa-instagram"></a>
          <a href="#" className="fab fa-linkedin"></a>
        </div>
        <form action="" className="subs-form">
          <input type="text" id="email" placeholder="Email address" />
          <button className="btn">subscribe</button>
        </form>
      </div>
      <div className="footer-bottom">
        <a className="credit">
          <span>©</span> 2021 EmGadgets | all rights reserved
        </a>
        <img src={paymentImg} />
      </div>
    </section>
  );
}
export default Footer;
