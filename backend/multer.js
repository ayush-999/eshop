const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = file.originalname.split(".").pop();
    const filename =
      file.originalname.split(".")[0] +
      "-" +
      uniqueSuffix +
      "." +
      fileExtension;
    cb(null, filename);
  },
});

exports.upload = multer({ storage: storage });
