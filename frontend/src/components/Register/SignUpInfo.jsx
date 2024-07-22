/* eslint-disable react/prop-types */
import { Field, ErrorMessage } from "formik";
import { FaCamera } from "react-icons/fa6";
import { useState } from "react";

const SignUpInfo = ({ formData, setFormData, errors, touched }) => {
  const [imageSrc, setImageSrc] = useState(
    formData.userPic
      ? URL.createObjectURL(formData.userPic)
      : "/img/default.png"
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
            <FaCamera />
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
              ? "border-error-600 bg-error-0 focus:border-error-600"
              : "border-gray-300"
          } text-gray-900 rounded-lg focus:border-primary-600 block w-full p-2.5`}
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

export default SignUpInfo;
