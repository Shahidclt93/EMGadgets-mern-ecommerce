import React, {
  Fragment,
  useEffect,
  useState,

 
} from "react";
import "./Products.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";


const categories = ["Laptop", "watches", "smartphones", "gadgets", "camera"];

const Products = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");

  const [ratings, setRatings] = useState(0);
  const [filterApplied, setFilterApplied] = useState(false);

  const [filterBarActive, setFilterActive] = useState(false);

  const filterBarToggle = () => {
    setFilterActive(!filterBarActive);
  };
  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  let count = filteredProductsCount;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  const filterRun = () => {
    setFilterApplied(true);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (filterApplied === true) {
      dispatch(getProduct(price, currentPage, category, ratings));
      setFilterApplied(false);
    }
  }, [
    dispatch,
    keyword,
    currentPage,
    category,
    price,
    ratings,
    alert,
    error,
    filterApplied,
  ]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS --- EmGadgets" />
          <h2 className="products-heading">Products</h2>
          <div className="products-section">
            <i className="filter-icon" onClick={filterBarToggle}>
              {" "}
              <FilterListIcon /> Filter Products
            </i>
            <div
              className={`filter-column ${filterBarActive ? "Factive" : ""}`}
            >
              <i className="close-icon" onClick={filterBarToggle}>
                <CloseIcon />
              </i>
              <Typography>Price</Typography>
              <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={25000}
                step={100}
              />
              <Typography>Categories</Typography>
              <ul className="categoryBox">
                {categories.map((category) => (
                  <li
                    className="category-link"
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
              <fieldset className="rating-above">
                <Typography component="legend">Rating Above</Typography>
                <Slider
                  value={ratings}
                  onChange={(e, newRating) => {
                    setRatings(newRating);
                  }}
                  getAriaLabelby="continuous-slider"
                  valueLabelDisplay="auto"
                  min={0}
                  max={5}
                />
              </fieldset>
              <button className="go-button" onClick={filterRun}>
                GO
              </button>
            </div>
            <div className="products-container">
              <div className="products-grid">
                {products &&
                  products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            </div>
          </div>

          {resultPerPage < count && (
            <div className="pagination-box">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
   
    </Fragment>
  );
};

export default Products;

