const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email!"],
    unique: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [4, "Password should be greater than 4 characters"],
    select: false,
  },
  phoneNumber: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["active", "inactive", "suspended"],
    default: "active",
  },
  addresses: [
    {
      addressType: {
        type: String,
      },
      name: {
        type: String,
      },
      userPhone: {
        type: Number,
      },
      country: {
        type: String,
      },
      state: {
        type: String,
      },
      userAddress: {
        type: String,
      },
      city: {
        type: String,
      },
      pincode: {
        type: Number,
      },
      landmark: {
        type: String,
      },
      userAlternatePhone: {
        type: Number,
      },
      isDefault: {
        type: Number,
        enum: [0, 1],
        default: 0,
      },
    },
  ],
  role: {
    type: String,
    default: "user",
  },
  avatar: {
    type: String,
    default: null,
  },
  // avatar: {
  //    public_id: {
  //       type: String,
  //       required: true,
  //    },
  //    url: {
  //       type: String,
  //       required: true,
  //    },
  // },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  resetPasswordToken: String,
  resetPasswordTime: Date,
  isActivated: {
    type: Boolean,
    default: false,
  },
  activationExpires: {
    type: Date,
  },
});

//  Hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// jwt token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
