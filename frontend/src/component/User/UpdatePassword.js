import React, { Fragment, useState, useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import MetaData from "../layout/MetaData";

import { clearErrors, updatePassword } from "../../actions/userAction";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const UpdatedPassword = {
    oldPassword: oldPassword,
    newPassword: newPassword,
    confirmPassword: confirmPassword,
  };

  const updatePasswordSubmit = (e) => {
    dispatch(updatePassword(UpdatedPassword));
    e.preventDefault();
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Password Updated successfully");
      navigate("/account");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, toast, navigate, isUpdated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Password" />
          <div className="register">
            <div className="sign-in-up">
              <div className="loginContainer active">
                <div className="update-password">
                  <div className="form signup">
                    <span className="title">Update Password</span>
                    <form
                      encType="multipart/form-data"
                      onSubmit={updatePasswordSubmit}
                    >
                      <div className="input-field">
                        <input
                          type="password"
                          className="password"
                          placeholder="Old Password"
                          required
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                        />
                        <div className="icon-container">
                          <i className="icon-left">
                            <VpnKeyIcon />
                          </i>
                        </div>
                      </div>
                      <div className="input-field">
                        <input
                          type="password"
                          className="password"
                          placeholder="New Password"
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <div className="icon-container">
                          <i className="icon-left">
                            <LockOpenIcon />
                          </i>
                        </div>
                      </div>
                      <div className="input-field">
                        <input
                          type="password"
                          className="password"
                          placeholder="Confirm Password"
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <div className="icon-container">
                          <i className="icon-left">
                            <LockIcon />
                          </i>
                        </div>
                      </div>

                      <div className="input-field button">
                        <input type="submit" value="Change" />
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
export default UpdatePassword;
