import React, { Fragment, useEffect } from "react";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import ScrollToTop from "../layout/ScrollToTop";
import slider1 from "../../images/slider1.png";
import slider2 from "../../images/slider2.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, ScrollBar, Ally } from "swiper/modules";
import { HiOutlineArrowNarrowRight,HiOutlineArrowNarrowLeft } from "react-icons/hi";


import "swiper/css";

import "swiper/css/navigation"


const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);
 
  

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
              navigation={
                {nextEl:".btn-next-slide",
                prevEl:".btn-prev-slide"}
              }
              modules={[Navigation]}
              // onSlideChange={() => console.log("slide change")}
              // onSwiper={(swiper) => console.log(swiper)}
            >
              <SwiperSlide>
                <div className="image">
                  <img src={slider1} />
                  <div className="title-content">
                    <h3>More luxy and trending</h3>
                    <h3>new and latest gadgets</h3>
                    <p>
                      loren loren loren loren loren loren loren loren loren
                      loren loren loren
                    </p>
                    <button>Shop Now</button>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide> <div className="image">
                  <img src={slider2} />
                  <div className="title-content">
                    <h3>Shop now and get gifts</h3>
                    <h3>latest gadgets and free</h3>
                    <p>
                      loren dsfds loren loren loren loren loren loren loren
                      loren loren loren
                    </p>
                    <button>Shop Now</button>
                  </div>
                </div></SwiperSlide>
              <SwiperSlide>Slide 3</SwiperSlide>
       
          

              <div className="btn-slide btn-next-slide"><HiOutlineArrowNarrowRight/></div>
              
              <div className="btn-slide btn-prev-slide"><HiOutlineArrowNarrowLeft/></div>
            
            </Swiper>
  

          </div>
         
         


          <h2 className="home-heading">
            FEATURED PRODUCTS <span className="home-heading-underline" />
          </h2>
          <div className="home-product-container">
            {products &&
              products
                .slice(0, 4)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>

          <h2 className="home-heading">
            LATEST ARRIVAL <span className="home-heading-underline" />
          </h2>

          <div className="home-product-container">
            {products &&
              products
                .slice(0, 4)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>

          <div className="home-product-container"></div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
