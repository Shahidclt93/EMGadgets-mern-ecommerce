import React, { Fragment, useEffect } from "react";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import slider1 from "../../images/hero-banner-1.png";
import slider2 from "../../images/hero-banner-2.png";
import slider3 from "../../images/hero-banner-3.png";
import serviceIcon1 from "../../images/service-icon-1.svg";
import serviceIcon2 from "../../images/service-icon-2.svg";
import serviceIcon3 from "../../images/service-icon-3.svg";
import serviceIcon4 from "../../images/service-icon-4.svg";
import category1 from "../../images/category-1.png";
import category2 from "../../images/category-2.png";
import category3 from "../../images/category-3.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import {
  HiOutlineArrowNarrowRight,
  HiOutlineArrowNarrowLeft,
} from "react-icons/hi";
import { FaArrowRight } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import ScrollToTop from "../layout/ScrollToTop"

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
            <ScrollToTop/>
          <section class="swiper-container">
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={{
                nextEl: ".btn-next-slide",
                prevEl: ".btn-prev-slide",
              }}
              modules={[Autoplay, Pagination, Navigation]}
            >
              <SwiperSlide>
                <div
                  className="banner-image"
                  style={{ backgroundImage: `url(${slider1})` }}
                >
                  <div className="title-content">
                    <h1 class="h1 hero-title">
                      Upgrade Your <br />
                      Gear with a Click
                    </h1>

                    <p class="hero-text">
                      Infused with unbeatable resale value,
                      <br /> reimagine your revenue possibilities.
                    </p>

                    <p class="price">Starting at ₹10000</p>

                    <a href="#" class="btn-hero">
                      Shop Now
                    </a>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div
                  className="banner-image"
                  style={{ backgroundImage: `url(${slider2})` }}
                >
                  <div className="title-content">
                    <h1 class="h1 hero-title">
                      Power Up Your <br />
                      Lifestyle Today
                    </h1>

                    <p class="hero-text">
                      Our offers enhance your inventory turnover.
                      <br /> our exclusive deals redefine profit margins.
                    </p>

                    <p class="price">Starting at ₹999</p>

                    <a href="#" class="btn-hero">
                      Shop Now
                    </a>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div
                  className="banner-image"
                  style={{ backgroundImage: `url(${slider3})` }}
                >
                  <div className="title-content">
                    <h1 class="h1 hero-title">
                      Discover <br />
                      with unbeatable prices
                    </h1>

                    <p class="hero-text">
                      Our discounts blend profit with quality.
                      <br /> Infused with unbeatable resale value.
                    </p>
                    <p class="price">Starting at ₹999</p>

                    <a href="#" class="btn-hero">
                      Shop Now
                    </a>
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
          </section>
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
                  <h2>Speakers</h2>
                  <p>Starting at ₹999</p>
                  <a
                    href=""
                    className="btn-link"
                    onClick={() => navigate("/products/&category=Gadgets")}
                  >
                    Shop Now <FaArrowRight />
                  </a>
                  <div
                    className="category-bg-image"
                    style={{ backgroundImage: `url(${category1})` }}
                  ></div>
                </li>
                <li className="category-item">
                  <h2>Smart Watches</h2>
                  <p>Get it now! </p>
                  <a
                    href=""
                    className="btn-link"
                    onClick={() => navigate("/products/&category=Watches")}
                  >
                    Shop Now <FaArrowRight />
                  </a>
                  <div
                    className="category-bg-image"
                    style={{ backgroundImage: `url(${category2})` }}
                  ></div>
                </li>
                <li className="category-item">
                  <h2>Headphones</h2>
                  <p>Starting at ₹1200</p>
                  <a
                    href=""
                    className="btn-link"
                    onClick={() => navigate("/products/&category=Headphones")}
                  >
                    Shop Now <FaArrowRight />
                  </a>
                  <div
                    className="category-bg-image"
                    style={{ backgroundImage: `url(${category3})` }}
                  ></div>
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

          <section className="banner-bottom">
            <div className="banner-1 banner-info">
              <p>New Collection</p>

              <h2 className="h2">Discover Our Autumn <br/>Skincare</h2>

              <a href="#" className="btn-hero">
                Explore More
              </a>
            </div>
            <div className="banner-2 banner-info">
              <h2 className="h2">25% off Everything</h2>

              <p>
                Makeup with extended range in colors <br/> for every human.
              </p>

              <a href="#" className="btn-hero">
                Shop Sale
              </a>
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
