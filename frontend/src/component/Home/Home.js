import React, { Fragment, useEffect } from "react";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

import ScrollToTop from "../layout/ScrollToTop";
import slider1 from "../../images/slider-1.png";
import slider2 from "../../images/slider-2.png";
import serviceIcon1 from "../../images/service-icon-1.svg";
import serviceIcon2 from "../../images/service-icon-2.svg";
import serviceIcon3 from "../../images/service-icon-3.svg";
import serviceIcon4 from "../../images/service-icon-4.svg";
import categoty1 from "../../images/category-1.jpg";
import categoty2 from "../../images/category-2.jpg";
import categoty3 from "../../images/category-3.jpg";
import categoty4 from "../../images/category-4.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import {
  HiOutlineArrowNarrowRight,
  HiOutlineArrowNarrowLeft,
} from "react-icons/hi";

import "swiper/css";

import "swiper/css/navigation";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, toast]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="EMgadgets" />
          <ScrollToTop />

          <div class="swiper-container">
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              navigation={{
                nextEl: ".btn-next-slide",
                prevEl: ".btn-prev-slide",
              }}
              modules={[Navigation]}
              // onSlideChange={() => console.log("slide change")}
              // onSwiper={(swiper) => console.log(swiper)}
            >
              <SwiperSlide>
                <div className="banner-image ">
                  <img src={slider1} />
                  <div className="title-content">
                    <h3>Hot Deals!</h3>
                    <h3>
                      Unbeatable <span>Prices</span>{" "}
                    </h3>
                    <p>
                      Dive into a world of innovation and savings! Discover the
                      latest Gadgets
                    </p>
                    <button>Shop Now</button>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <div className="banner-image">
                  <img src={slider2} />
                  <div className="title-content">
                    <h3>Smart Living Starts Here!</h3>
                    <h3>
                      Unwrap Ways of <span>Savings</span>{" "}
                    </h3>
                    <p>Redefine the way you interact with technology</p>
                    <button>Shop Now</button>
                  </div>
                </div>
              </SwiperSlide>

              <div className="btn-slide btn-next-slide">
                <HiOutlineArrowNarrowRight />
              </div>

              <div className="btn-slide btn-prev-slide">
                <HiOutlineArrowNarrowLeft />
              </div>
            </Swiper>
          </div>
          <section className="service">
            <div className="container">
              <ul className="service-list">
                <li className="service-item">
                  <div className="service-item-icon">
                    <img src={serviceIcon1} alt="Service icon" />
                  </div>

                  <div className="service-content">
                    <p className="service-item-title">Free Shipping</p>
                    <p className="service-item-text">On All Order</p>
                  </div>
                </li>

                <li className="service-item">
                  <div className="service-item-icon">
                    <img src={serviceIcon2} alt="Service icon" />
                  </div>

                  <div className="service-content">
                    <p className="service-item-title">Easy Returns</p>
                    <p className="service-item-text">30 Day Returns Policy</p>
                  </div>
                </li>

                <li className="service-item">
                  <div className="service-item-icon">
                    <img src={serviceIcon3} alt="Service icon" />
                  </div>

                  <div className="service-content">
                    <p className="service-item-title">Secure Payment</p>
                    <p className="service-item-text">100% Secure Guarantee</p>
                  </div>
                </li>

                <li className="service-item">
                  <div className="service-item-icon">
                    <img src={serviceIcon4} alt="Service icon" />
                  </div>

                  <div className="service-content">
                    <p className="service-item-title">Special Support</p>
                    <p className="service-item-text">24/7 Dedicated Support</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <h2 className="home-heading">
            FEATURED PRODUCTS <span className="home-heading-underline" />
          </h2>
          <div className="home-product-section">
            {products &&
              products
                .slice(0, 4)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>
          <h2 className="home-heading">CATEGORIES</h2>

          <section className="category">
            <div className="container">
              <ul className="category-list">
                <li className="category-item">
                  <figure className="category-banner">
                    <img src={categoty1} alt="Headphones" />
                  </figure>

                  <a
                    href=""
                    className="category-item-btn"
                    onClick={() => navigate("/products/&category=Headphones")}
                  >
                    Audio and Headphones
                  </a>
                </li>

                <li className="category-item">
                  <figure className="category-banner">
                    <img src={categoty2} alt="Wearables" />
                  </figure>

                  <a
                    href=""
                    className="category-item-btn"
                    onClick={() => navigate("/products/&category=Watches")}
                  >
                    Wearables
                  </a>
                </li>

                <li className="category-item">
                  <figure className="category-banner">
                    <img src={categoty3} alt="Mobile Accessories" />
                  </figure>

                  <a
                    href=""
                    className="category-item-btn"
                    onClick={() =>
                      navigate("/products/&category=Mobile%Accessories")
                    }
                  >
                    Mobile Accessories
                  </a>
                </li>

                <li className="category-item">
                  <figure className="category-banner">
                    <img src={categoty4} alt="Productivity Gadgets" />
                  </figure>

                  <a
                    href=""
                    className="category-item-btn"
                    onClick={() => navigate("/products/&category=Gadgets")}
                  >
                    Productivity Gadgets
                  </a>
                </li>
              </ul>
            </div>
          </section>
          <h2 className="home-heading">
            LATEST ARRIVALS <span className="home-heading-underline" />
          </h2>

          <section className="home-product-section">
            {products &&
              products
                .slice(5, 9)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
