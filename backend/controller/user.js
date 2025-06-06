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
const { isAuthenticated } = require("../middleware/auth");

// Create User
router.post("/create-user", async (req, res, next) => {
  try {
    const { name, email, userMobile, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      return next(new ErrorHandler("User already exists", 400));
    }

    const user = new User({
      name,
      email,
      phoneNumber: userMobile,
      password,
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
const createActivationToken = (user) => {
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
    password: user.password,
    phoneNumber: user.phoneNumber,
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

      if (!newUser) {
        return next(new ErrorHandler("Invalid token", 400));
      }

      const { name, email, password, phoneNumber, avatar } = newUser;
      let user = await User.findOne({ email });

      if (user) {
        if (user.isActivated) {
          return res.status(200).json({ message: "Account already activated" });
        } else {
          return next(
            new ErrorHandler("User already exists but is not activated", 400)
          );
        }
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

// Login User
router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }
      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// load user
router.get(
  "/getuser",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return next(new ErrorHandler("User doesn't exists", 400));
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// log out user
router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.status(201).json({
        success: true,
        message: "Log out successful!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Update user details
router.put(
  "/edit-user/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, email, phoneNumber, gender } = req.body;
      const user = await User.findById(id);
      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }
      if (name) user.name = name;
      if (email) user.email = email;
      if (phoneNumber) user.phoneNumber = phoneNumber;
      if (gender) user.gender = gender;

      await user.save();
      res.status(200).json({
        success: true,
        message: "User details updated successfully!",
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Delete user
router.delete(
  "/delete-user/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }
      await user.remove();
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Add user address
router.post(
  "/add-address/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { id } = req.params;
      const { newAddress } = req.body;
      const user = await User.findById(id);

      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      // If the new address is set as default, update other addresses
      if (newAddress.isDefault === 1) {
        user.addresses.forEach((address) => {
          address.isDefault = 0;
        });
      }

      // Push the new address to the addresses array
      user.addresses.push(newAddress);

      await user.save();
      res.status(200).json({
        success: true,
        message: "Address added successfully",
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Edit user address
router.post(
  "/edit-address/:userId/:addressId",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { userId, addressId } = req.params;
      const { newAddress } = req.body;
      const user = await User.findById(userId);

      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      // Find the specific address by addressId and update it
      const addressIndex = user.addresses.findIndex(
        (address) => address._id.toString() === addressId
      );

      if (addressIndex === -1) {
        return next(new ErrorHandler("Address not found", 404));
      }

      // Update the specific address fields
      user.addresses[addressIndex] = {
        ...user.addresses[addressIndex].toObject(),
        ...newAddress,
      };

      // If the new address is set as default, update other addresses
      if (newAddress.isDefault === 1) {
        user.addresses.forEach((address, index) => {
          if (index !== addressIndex) {
            address.isDefault = 0;
          }
        });
      }

      await user.save();
      res.status(200).json({
        success: true,
        message: "Address updated successfully",
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Delete user address
router.delete(
  "/delete-address/:userId/:addressId",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    const { userId, addressId } = req.params;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      // Remove the address with the specified addressId
      user.addresses = user.addresses.filter(
        (address) => address._id.toString() !== addressId
      );

      await user.save();
      res.status(200).json({
        success: true,
        message: "Address deleted successfully",
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
