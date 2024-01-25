import React, { Fragment, useState, useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MetaData from "../layout/MetaData";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const { error, message, loading } = useSelector((state) => state.profile);

  const [email, setEmail] = useState("");
  const emailForPass = { email: email };

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(emailForPass));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, toast, message]);

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
