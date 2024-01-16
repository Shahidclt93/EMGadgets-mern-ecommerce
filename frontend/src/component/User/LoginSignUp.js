import React, { useState, Fragment, useEffect } from "react";
import "./LoginSignUp.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import FaceIcon from "@mui/icons-material/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader";
import { useNavigate, Link, useLocation, } from "react-router-dom";

function LoginSignUp() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const location = useLocation();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [containerActive, setContainerActive] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loginPasswordVisible, setLoginPasswordVisible] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});
  const { name, email, password, confirmPassword } = user;
  const [passwordNotMatch, setPasswordNotMatch] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();

    dispatch(login(loginEmail, loginPassword));
   
  };
  const registerSubmit = (e) => {
    if (password !== confirmPassword) {
      e.preventDefault();
      setPasswordNotMatch("passwords do not match");
    } else {
      dispatch(register(user));
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setPasswordVisible(!passwordVisible);
    } else if (field === "confirmPassword") {
      setConfirmPasswordVisible(!confirmPasswordVisible);
    } else if (field === "loginPassword") {
      setLoginPasswordVisible(!loginPasswordVisible);
    }
  };

  const registerDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  
 

    const redirect = location.search ? location.search.split("=")[1] : "/account";
  
  
  
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate(redirect);
    }
   
    
  }, [dispatch, error, redirect,navigate,alert, isAuthenticated]);

  const toggleContainer = () => {
    setContainerActive(!containerActive);
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="register">
          <div className="sign-in-up">
            <div className={`loginContainer ${containerActive ? "active" : ""}`}>
              <div className="forms">
                <div className="form login">
                  <span className="title">Login</span>

                  <form onSubmit={loginSubmit}>
                    <div className="icon-container">
                      <div className="input-field">
                        <input
                          type="email"
                          placeholder="Email"
                          required
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                        />
                        <i className="icon-left">
                          <MailOutlineIcon />
                        </i>
                      </div>
                    </div>
                    <div className="input-field">
                      <input
                        type={loginPasswordVisible ? "text" : "password"}
                        className="password"
                        placeholder="Enter your password"
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                      <div className="icon-container">
                        <i className="icon-left">
                          <LockOpenIcon />
                        </i>

                        <i
                          className="icon-right"
                          onClick={() =>
                            togglePasswordVisibility("loginPassword")
                          }
                        >
                          {loginPasswordVisible ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </i>
                      </div>
                    </div>
                    <div className="checkbox-text">
                      <div className="checkbox-content">
                        <input type="checkbox" id="logCheck" />
                        <label for="logCheck" className="text">
                          Remember me
                        </label>
                      </div>

                      <a href="#" className="text">
                        <Link to="/password/forgot">Forgot password?</Link>
                      </a>
                    </div>
                    <div className="input-field button">
                      <input type="submit" value="Login" />
                    </div>
                  </form>
                  <div className="login-signup">
                    <p className="orOption">Not a member?</p>
                    <button
                      className="createAccBtn"
                      value="Create Account"
                      onClick={() => toggleContainer()}
                    >
                      Create Account
                    </button>
                  </div>
                </div>
                {/* <!-- Registration Form --> */}
                <div className="form signup">
                  <span className="title">Registration</span>
                  <form encType="multipart/form-data" onSubmit={registerSubmit}>
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
                    <div className="input-field">
                      <input
                        type={passwordVisible ? "text" : "password"}
                        className="password"
                        placeholder="Create a password"
                        required
                        name="password"
                        value={password}
                        onChange={registerDataChange}
                      />
                      <div className="icon-container">
                        <i className="icon-left">
                          <LockOpenIcon />
                        </i>
                        <i
                          className="icon-right"
                          onClick={() => togglePasswordVisibility("password")}
                        >
                          {" "}
                          {passwordVisible ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </i>
                      </div>
                    </div>
                    <div className="input-field">
                      <input
                        type={confirmPasswordVisible ? "text" : "password"}
                        className="password"
                        placeholder="Confirm password"
                        required
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={registerDataChange}
                      />
                      <div className="icon-container">
                        <i className="icon-left">
                          <LockIcon />
                        </i>

                        <i
                          className="icon-right"
                          onClick={() =>
                            togglePasswordVisibility("confirmPassword")
                          }
                        >
                          {confirmPasswordVisible ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </i>
                      </div>
                    </div>
                    <div className="checkbox-text">
                      <div className="checkbox-content">
                        <input type="checkbox" id="termCon" />
                        <label for="termCon" className="text">
                          I accepted all terms and conditions
                        </label>
                      </div>
                    </div>
                    <div className="input-field button">
                      <input type="submit" value="Register" />
                    </div>
                  </form>
                  <div className="login-signup">
                    <span className="text">
                      Already a member?
                      <a
                        href="#"
                        className="text login-link"
                        onClick={() => toggleContainer()}
                      >
                        Login Now
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
export default LoginSignUp;
