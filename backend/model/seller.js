const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const sellerSchema = new mongoose.Schema({
  shopName: {
    type: String,
  },
  sellerName: {
    type: String,
  },
  establishmentDate: {
    type: Date,
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
    unique: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive", "suspended"],
    default: "inactive",
  },
  addresses: [
    {
      addressType: {
        type: String,
      },
      sellerName: {
        type: String,
      },
      sellerPhone: {
        type: Number,
      },
      country: {
        type: String,
      },
      state: {
        type: String,
      },
      sellerAddress: {
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
      sellerAlternatePhone: {
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
    default: "seller",
  },
  sellerLogo: {
    type: String,
    default: null,
  },
  // sellerLogo: {
  //    public_id: {
  //       type: String,
  //       required: true,
  //    },
  //    url: {
  //       type: String,
  //       required: true,
  //    },
  // },
  gstNumber: {
    type: String,
    unique: true,
  },
  panNumber: {
    type: String,
    unique: true,
  },
  aadharNumber: {
    type: String,
    unique: true,
  },
  sellerActLicense: {
    type: String,
    unique: true,
  },
  tradeLicense: {
    type: String,
    unique: true,
  },
  fssaiLicense: {
    type: String,
    unique: true,
  },
  otherLicense: {
    type: String,
  },
  bankDetails: [
    {
      bankName: {
        type: String,
        unique: true,
      },
      accountNumber: {
        type: Number,
        unique: true,
      },
      ifscCode: {
        type: String,
      },
      branchName: {
        type: String,
      },
      accountType: {
        type: String,
        enum: ["savings", "current"],
      },
    },
  ],
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
  isPhoneVerified: {
    type: Boolean,
    default: false,
  },
});

//  Hash password
sellerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// jwt token
sellerSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// compare password
sellerSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Seller", sellerSchema);
