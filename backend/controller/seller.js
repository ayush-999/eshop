const express = require("express");
const router = express.Router();
const otpGenerator = require("otp-generator");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const Seller = require("../model/seller");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMailForActivationUrl = require("../utils/Emails/sendMailForActivationUrl");
const sendToken = require("../utils/jwtToken");
const { isAuthenticated } = require("../middleware/auth");

// const sendOtpToUser = async (phoneNumber, otp) => {
// Implement SMS sending logic here, e.g., using Twilio
// console.log(`Sending OTP ${otp} to ${phoneNumber}`);
// Example with Twilio:
// const accountSid = 'your_account_sid';
// const authToken = 'your_auth_token';
// const client = require('twilio')(accountSid, authToken);
// await client.messages.create({
//   body: `Your OTP is ${otp}`,
//   from: 'your_twilio_number',
//   to: phoneNumber
// });
// };

// Generate OTP
router.post("/send-otp", async (req, res) => {
  const { phoneNumber } = req.body;

  // Generate a 4-digit OTP (only digits)
  const otp = otpGenerator.generate(4, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  // Log OTP to console (for demonstration purposes)
  console.log(`OTP for ${phoneNumber}: ${otp}`);

  // Store OTP temporarily (e.g., in a cache or database)
  // For simplicity, we'll use a global variable
  global.otpStorage = { [phoneNumber]: otp };

  // Set a timeout to clear the OTP after 30 seconds
  setTimeout(() => {
    delete global.otpStorage[phoneNumber];
  }, 30000);

  try {
    // await sendOtpToUser(phoneNumber, otp);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Failed to send OTP:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

router.post("/verify-otp", async (req, res) => {
  const { phoneNumber, otp } = req.body;

  try {
    if (global.otpStorage && global.otpStorage[phoneNumber] === otp) {
      await Seller.findOneAndUpdate(
        { phoneNumber: phoneNumber },
        { isPhoneVerified: 1 }
      );
      res.status(200).json({ message: "OTP verified successfully" });
    } else {
      res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Failed to verify OTP:", error);
    res.status(500).json({ message: "Failed to verify OTP" });
  }
});

router.post("/create-seller", async (req, res, next) => {
  try {
    const { email, phoneNumber, password } = req.body;
    const sellerEmail = await Seller.findOne({ email });
    if (sellerEmail) {
      return next(new ErrorHandler("Seller already exists", 400));
    }

    const seller = new Seller({
      email,
      phoneNumber: phoneNumber,
      password,
    });

    const activationToken = createActivationToken(seller);
    const activationUrl = `${process.env.FRONTEND_URL}/activation/${activationToken}`;
    try {
      await sendMailForActivationUrl({
        email: seller.email,
        subject: "Activate your account",
        activationUrl: activationUrl,
        userName: seller.name,
      });
      res.status(201).json({
        success: true,
        message: `Check your entered email to activate your account!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (err) {
    next(new ErrorHandler(err.message, 400));
  }
});

// activationToken token function
const createActivationToken = (seller) => {
  const payload = {
    id: seller._id,
    email: seller.email,
    password: seller.password,
    phoneNumber: user.phoneNumber,
  };
  return jwt.sign(payload, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// activate user
router.post(
  "/seller/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newSeller = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newSeller) {
        return next(new ErrorHandler("Invalid token", 400));
      }

      const { email, password, phoneNumber } = newSeller;

      let seller = await Seller.findOne({ email });

      if (seller) {
        if (seller.isActivated) {
          return res.status(200).json({ message: "Account already activated" });
        } else {
          return next(
            new ErrorHandler("Seller already exists but is not activated", 400)
          );
        }
        seller.isActivated = true;
        await seller.save();
        return res
          .status(200)
          .json({ message: "Account activated successfully" });
      }

      if (seller) {
        return next(new ErrorHandler("Seller already exists", 400));
      }

      seller = await Seller.create({
        email,
        password,
        phoneNumber,
        isActivated: true,
        activationExpires: new Date(),
      });
      sendToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// load user
router.get(
  "/getSeller",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Seller.findById(req.seller.id);

      if (!seller) {
        return next(new ErrorHandler("Seller doesn't exists", 400));
      }

      res.status(200).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
