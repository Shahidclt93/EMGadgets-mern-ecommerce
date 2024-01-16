import React, { useState, Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllReveiws,
  deleteReviews,
} from "../../actions/productAction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import StarIcon from "@mui/icons-material/Star";

import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";
import "./ProductReviews.css";

const ProductReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );

  const [productId, setProductId] = useState("");

  const deleteProductHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  };
  const productReviewSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReveiws(productId));
  };
  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReveiws(productId));
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Review Deleted Successfully");
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, alert, deleteError, navigate, isDeleted, productId]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 0.6,
    },
    {
      field: "comment",
      headerName: "Comment",

      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button onClick={() => deleteProductHandler(params.id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];
  reviews && reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`All Reviews - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            onSubmit={productReviewSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>
            <div>
              <StarIcon />
              <input
                type="text"
                placeholder="Name"
                value={productId}
                required
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
            
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Find
            </Button>
          </form>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
