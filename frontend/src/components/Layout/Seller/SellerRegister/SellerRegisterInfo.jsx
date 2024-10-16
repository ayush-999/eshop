/* eslint-disable react/prop-types */
import { Field, ErrorMessage } from "formik";
import { PiCameraFill } from "react-icons/pi";
import { useState } from "react";

const SellerRegisterInfo = ({ formData, setFormData, errors, touched }) => {
  const [imageSrc, setImageSrc] = useState(
    formData.userPic
      ? URL.createObjectURL(formData.userPic)
      : "assets/img/default.png"
  );

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageSrc(URL.createObjectURL(file));
      setFormData("userPic", file);
    }
  };
  return (
    <div className="space-y-4 md:space-y-4">
      <div className="flex justify-center">
        <div className="imgWrapper">
          <label
            htmlFor="userPic"
            id="uploadBtn"
            className="uploadBtn bg-gray-100 rounded-full hover:bg-primary-600 hover:text-white"
          >
            <PiCameraFill />
          </label>
          <img
            src={imageSrc}
            className="rounded-full ring-4 ring-gray-100 userImage"
            id="userImage"
            alt="User Image"
          />
          <input
            type="file"
            id="userPic"
            className="userPic"
            name="userPic"
            onChange={handleImageUpload}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="fname"
          className="inline-block mb-2 text-sm font-medium text-gray-900"
        >
          Your full name
        </label>
        <Field
          type="text"
          name="fname"
          id="fname"
          className={`bg-gray-50 border ${
            errors.fname && touched.fname
              ? "border-red-600 bg-red-50 focus-within:border-red-600"
              : "border-gray-300"
          } text-gray-900 rounded-lg focus-within:border-primary-600 block w-full p-2.5`}
          placeholder="Enter full name"
          autoComplete="off"
        />
        <ErrorMessage
          name="fname"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>
    </div>
  );
};
export default SellerRegisterInfo;
