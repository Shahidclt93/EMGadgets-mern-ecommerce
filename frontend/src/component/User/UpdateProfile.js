import React, { Fragment, useState, useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FaceIcon from "@mui/icons-material/Face";
import MetaData from "../layout/MetaData";
import { clearErrors, updateProfile, loadUser } from "../../actions/userAction";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [userInfo, setUserInfo] = useState({ email: "", name: "" });
  const { email, name } = userInfo;

  const updateProfileSubmit = (e) => {
    dispatch(updateProfile(userInfo));
    e.preventDefault();
  };
  const registerDataChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (user) {
      setUserInfo({ name: user.name, email: user.email });
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Profile Updated successfully");
      dispatch(loadUser());
      navigate("/account");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, toast, navigate, user, isUpdated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Profile" />
          <div className="register">
            <div className="sign-in-up">
              <div className="loginContainer active">
                <div className="update-profile">
                  <div className="form signup">
                    <span className="title">Update Profile</span>
                    <form
                      encType="multipart/form-data"
                      onSubmit={updateProfileSubmit}
                    >
                      <div className="input-field">
                        <input
                          type="text"
                          placeholder="Enter your name"
                          required
                          name="name"
                          value={name}
                          onChange={registerDataChange}
                        />
                        <div className="icon-container">
                          <i className="icon-left">
                            <FaceIcon />
                          </i>
                        </div>
                      </div>
                      <div className="input-field">
                        <input
                          type="text"
                          placeholder="Enter your email"
                          required
                          name="email"
                          value={email}
                          onChange={registerDataChange}
                        />
                        <div className="icon-container">
                          <i className="icon-left">
                            <MailOutlineIcon />
                          </i>
                        </div>
                      </div>

                      <div className="input-field button">
                        <input type="submit" value="updateProfile" />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default UpdateProfile;
