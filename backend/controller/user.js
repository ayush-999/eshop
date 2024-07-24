const express = require("express");
const path = require("path");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const User = require("../model/user");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMailForActivationUrl = require("../utils/Emails/sendMailForActivationUrl");
const sendToken = require("../utils/jwtToken");

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

    // const user = {
    //   name: name,
    //   email: email,
    //   phoneNumber: userMobile,
    //   password: password,
    //   avatar: fileUrl,
    // };
    
    const user = new User({
      name,
      email,
      phoneNumber: userMobile,
      password,
      avatar: fileUrl,
    });

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
    next(new ErrorHandler(err.message, 400));
  }
});

// activationToken token function
const createActivationToken = (user) => {
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
    password: user.password,
    phoneNumber: user.phoneNumber,
    avatar: user.avatar,
  };
  return jwt.sign(payload, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// activate user
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );
      
      if(!newUser){
        return next(new ErrorHandler("Invalid token", 400))
      }

      const { name, email, password, phoneNumber, avatar } = newUser;
      let user = await User.findOne({ email });

      if (user) {
        if (user.isActivated) {
          return res.status(200).json({ message: "Account already activated" });
        } 
          user.isActivated = true;
          await user.save();
          return res.status(200).json({ message: "Account activated successfully" });
      }
      
      if (user) {
        return next(new ErrorHandler("User already exists", 400));
      }

      user = await User.create({
        name,
        email,
        password,
        phoneNumber,
        avatar,
        isActivated: true,
        activationExpires: new Date(),
      });
      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
