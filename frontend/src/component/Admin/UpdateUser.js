import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./NewProduct.css";
import {
  clearErrors,
  getUserDetails,
  updateUser,
} from "../../actions/userAction";
import { useParams, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import SideBar from "./Sidebar";
import Loader from "../layout/Loader/Loader";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

import FaceIcon from "@mui/icons-material/Face";

import { UPDATE_USER_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const params = useParams();

  const { loading, error, user } = useSelector((state) => state.userDetails);
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const userId = params.id;

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user && user.name);
      setEmail(user && user.email);
      setRole(user && user.role);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("User Updated successfully");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, navigate, isUpdated, updateError, user, userId]);

  const updateSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(userId, myForm));
  };

  return (
    <Fragment>
      <MetaData title="User Update" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <form
              className="createProductContainer"
              onSubmit={updateSubmitHandler}
            >
              <h1>Update User</h1>
              <div>
                <FaceIcon />
                <input
                  type="text"
                  placeholder="User Name"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Roles</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  updateLoading ? true : false || role === "" ? true : false
                }
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
