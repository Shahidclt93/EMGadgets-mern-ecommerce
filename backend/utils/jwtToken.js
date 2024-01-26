//Create token and send in cookie
const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  //options for cookie
  const options = {
    
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};
module.exports = sendToken;
