const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  const authHeader = req.headers?.authorization;
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(" ")[1];
  let decoded;
  try {
    //check if token is valid
    decoded = jwt.verify(token, process.env.TOKEN);

    //check if user still exist
    const user = await User.exists({ _id: decoded.id });
    if (!user) throw error;
  } catch (error) {
    req.isAuth = false;
    return next();
  }
  //if everything all right
  req.userId = decoded.id;
  req.isAuth=true;
  next();
};
