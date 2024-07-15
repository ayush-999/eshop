const express = require('express');
const path = require('path');
const router = express.Router();
const { upload } = require('../multer');
const ErrorHandler = require('../utils/ErrorHandler');
const User = require('../model/user');
const fs = require('fs');

router.post('/create-user', upload.single('file'), async (req, res, next) => {
   try {
      const { name, email, password, addresses } = req.body;
      const country = addresses && addresses.country;
      const userEmail = await User.findOne({ email });
      if (userEmail) {
         if (req.file) {
            const filename = req.file.filename;
            const filePath = `uploads/${filename}`;
            fs.unlink(filePath, (err) => {
               if (err) {
                  console.log(err);
                  return res
                     .status(500)
                     .json({ message: 'Error deleting file' });
               } else {
                  console.log('File deleted successfully');
               }
            });
         }
         return next(new ErrorHandler('User already exists', 400));
      }

      const filename = req.file ? req.file.filename : null;
      const fileUrl = filename ? path.join(filename) : null;

      const user = {
         name: name,
         email: email,
         password: password,
         avatar: fileUrl,
         addresses: {
            country: country,
         },
      };

      const newUser = await User.create(user);
      res.status(201).json({
         success: true,
         newUser,
      });
   } catch (err) {
      next(err); // Pass any errors to the error handler middleware
   }
});

module.exports = router;
