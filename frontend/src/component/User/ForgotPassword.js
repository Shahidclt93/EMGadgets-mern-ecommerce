import React, { Fragment, useState, useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MetaData from "../layout/MetaData";

import { clearErrors, forgotPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.forgotPassword);
  const { error, message, loading } = useSelector((state) => state.profile);

  const [email, setEmail] = useState("");
  const  emailForPass = {"email":email}

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(emailForPass))
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Forgot Password" />
          <div className="register">
            <div className="sign-in-up">
              <div className="loginContainer active">
                <div className="forgot-password">
                  <div className="form signup">
                    <span className="title">Recover Password</span>
                    <form
                      encType="multipart/form-data"
                      onSubmit={forgotPasswordSubmit}
                    >
                      <div className="input-field">
                        <input
                          type="text"
                          placeholder="Enter your email"
                          required
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="icon-container">
                          <i className="icon-left">
                            <MailOutlineIcon />
                          </i>
                        </div>
                      </div>

                      <div className="input-field button">
                        <input type="submit" value="sent email" />
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
export default ForgotPassword;
