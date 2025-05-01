const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  // const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);
  next();
});

// Separate middleware for sellers only
exports.isSeller = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  
  if (!token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  
  req.seller = await Seller.findById(decoded.id);
  if (!req.seller) {
    return next(new ErrorHandler("Seller not found", 404));
  }
  
  next();
});

// Separate middleware for users only
// exports.isUser = catchAsyncErrors(async (req, res, next) => {
//   const { token } = req.cookies;
  
//   if (!token) {
//     return next(new ErrorHandler("Please login to continue", 401));
//   }

//   const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  
//   req.user = await User.findById(decoded.id);
//   if (!req.user) {
//     return next(new ErrorHandler("User not found", 404));
//   }
  
//   next();
// });