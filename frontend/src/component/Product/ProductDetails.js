import React, { Fragment, useEffect, useState, useRef } from "react";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import { useParams } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import ReviewCard from "./ReviewCard";
import { toast } from 'react-toastify';
import MetaData from "../layout/MetaData";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { addItemsToCart } from "../../actions/cartAction";
import Rating from "@mui/material/Rating";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isActiveReview, setIsActiveReview] = useState(false);

  const toggleReviewModal = () => {
    setIsActiveReview(!isActiveReview);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  });
  const [slideIndex, setSlideIndex] = useState(1);

  function plusSlide(n) {
    setSlideIndex((prev) => prev + n);
    slideShow(slideIndex + n);
  }
  function slideShow(n) {
    if (n > product.images.length) {
      setSlideIndex(1);
    }
    if (n < 1) {
      setSlideIndex(product.images.length);
    }
  }

  const [count, setCount] = useState(product.Stock < 1 ? 1 : 0);

  const handleMinus = () => {
    if (count > 0) {
      setCount(count - 1);
    } else {
      setCount(0);
    }
  };

  const handlePlus = () => {
    if (count < product.Stock) {
      setCount(count + 1);
    } else {
      setCount(product.Stock);
    }
  };
  const id = params.id;

  const addToCartHandler = () => {
    if (count >= 1) {
      dispatch(addItemsToCart(id, count));
      toast.success("Item Added to Cart");
    } else {
      toast.error("item quantity is 0");
    }
  };
  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);
    dispatch(newReview(myForm));
    setIsActiveReview(false);
  };

  const options = {
    size: "20",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success("Review added successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, toast, reviewError, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} --- EMGadget`} />
          <span
            className={isActiveReview ? "overlay-review" : ""}
            onClick={toggleReviewModal}
          ></span>
          <div className="product-container">
            <section className="product-details">
              {product.images &&
                product.images.map((item, i) => (
                  <div className="product-page-img">
                    <div className="numbertext">
                      {i + 1} / {product.images.length}
                    </div>
                    <div
                      key={i}
                      className="mySlides"
                      style={{
                        display: i + 1 === slideIndex ? "block" : "none",
                      }}
                    >
                      <img src={item.url} />
                    </div>
                    <a href="#!" onClick={() => plusSlide(-1)} className="prev">
                      &#10094;{" "}
                    </a>
                    <a href="#!" onClick={() => plusSlide(1)} className="next">
                      &#10095;
                    </a>

                    <div className="slider-img">
                      <div
                        key={i}
                        className={`slider-box ${
                          i + 1 === slideIndex ? "active" : ""
                        }`}
                        onClick={() => setSlideIndex(i + 1)}
                      >
                        <img src={item.url} />
                      </div>
                    </div>
                  </div>
                ))}

              <div className="product-page-details">
                <strong>{product.name}</strong>
                <p className="product-category">{product.category}</p>
                <div className="product-review">
                  <Rating {...options} />
                  <span className="review-count">
                    {product.numOfReviews} reviews
                  </span>
                </div>

                <p className="product-price">₹{product.price}</p>
                <p className="small-desc">{product.description}</p>

                <div class="quantity">
                  <button
                    class="plus-btn"
                    type="button"
                    name="button"
                    onClick={handlePlus}
                  >
                    <AddIcon />
                  </button>
                  <input type="text" name="name" value={count} />
                  <button
                    class="minus-btn"
                    type="button"
                    name="button"
                    onClick={handleMinus}
                  >
                    <RemoveIcon />
                  </button>
                </div>
                <div className="cart-btn">
                  <button
                    href="#!"
                    className="add-cart"
                    onClick={addToCartHandler}
                    disabled={product.Stock < 1 ? true : false}
                  >
                    Add to Cart
                  </button>
                  <a href="#!" className="add-cart buy-now">
                    Buy Now
                  </a>
                </div>
                <p className="product-status">
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
                <button className="review-btn" onClick={toggleReviewModal}>
                  add review
                </button>
              </div>
            </section>
            <section
              className={`review-post ${isActiveReview ? "active" : ""}`}
            >
              <div className="review-modalBox ">
                <h2>Post Review</h2>
                <Rating
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
                <textarea
                  style={{ width: "300px", height: "200px", fontSize: "20px" }}
                  placeholder="Enter text here..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <div className="reviewPostBtn">
                  <button className="close-btn" onClick={reviewSubmitHandler}>
                    Post
                  </button>
                  <button onClick={toggleReviewModal}>Close</button>
                </div>
              </div>
            </section>

            {product.reviews && product.reviews[0] ? (
              <div className="reviews">
                {product.reviews &&
                  product.reviews.map((review) => (
                    <ReviewCard review={review} />
                  ))}
              </div>
            ) : (
              <p className="no-reviews">No Reviews</p>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default ProductDetails;
