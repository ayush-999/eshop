const express = require("express");
const path = require("path");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const User = require("../model/user");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMailForActivationUrl = require("../utils/Emails/sendMailForActivationUrl");

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, userMobile, password } = req.body;
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      if (req.file) {
        const filename = req.file.filename;
        const filePath = `uploads/${filename}`;
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ message: "Error deleting file" });
          } else {
            console.log("File deleted successfully");
          }
        });
      }
      return next(new ErrorHandler("User already exists", 400));
    }

    const filename = req.file ? req.file.filename : null;
    const fileUrl = filename ? path.join(filename) : null;

    const user = {
      name: name,
      email: email,
      userMobile: userMobile,
      password: password,
      avatar: fileUrl,
    };
    console.log(user)
    const activationToken = createActivationToken(user);
    const activationUrl = `${process.env.FRONTEND_URL}/activation/${activationToken}`;
    try {
      await sendMailForActivationUrl({
        email: user.email,
        subject: "Activate your account",
        activationUrl: activationUrl,
        userName: user.name,
      });
      res.status(201).json({
        success: true,
        // message: `Please check your email (${user.email}) to activate your account!`,
        message: `Check your entered email to activate your account!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (err) {
    if (req.file) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Error deleting file" });
        } else {
          console.log("File deleted successfully");
        }
      });
    }
    next(new ErrorHandler(err.message, 400)); // Pass any errors to the error handler middleware
  }
});

// activationToken token function
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// activate user

module.exports = router;
