/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SyncLoader } from "react-spinners";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { server } from "../../server";
import { toast } from "react-toastify";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import "./RegisterModel.css";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const RegisterModel = ({ setOpen }) => {
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prevState) => !prevState);
  };

  // Combined validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Full name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    userMobile: Yup.string()
      .required("Mobile number is required")
      .matches(/^\+\d{1,3}\d{3,}$/, "Invalid mobile number"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const initialValues = {
    name: "",
    email: "",
    userMobile: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(`${server}/user/create-user`, values, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success(res.data.message);
      setOpen(false);
      navigate("/");
    } catch (err) {
      if (err.res && err.res.data && err.res.data.message) {
        toast.error(err.res.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-popup">
      <div className="register-overlay">
        <div className="w-[34%] h-[98vh] bg-white rounded-lg shadow-sm relative p-6 overflow-y-scroll">
          <RxCross1 className="register-close" onClick={() => setOpen(false)} />
          <div className="block w-full">
            <h2 className="text-center font-bold text-2xl mb-2">Register</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isValid, setFieldValue, dirty }) => (
                <Form className="space-y-4 md:space-y-4">
                  {/* Full Name Field */}
                  <div className="input-container c-mb-16">
                    <label
                      htmlFor="name"
                      className="inline-block mb-2 text-sm font-medium text-gray-900"
                    >
                      Your full name
                    </label>
                    <Field
                      type="text"
                      name="name"
                      id="name"
                      className={`bg-gray-50 border ${
                        errors.name && touched.name
                          ? "border-red-600 bg-red-50"
                          : "border-gray-300"
                      } text-gray-900 rounded-lg block w-full p-2.5`}
                      placeholder="Enter full name"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="error-message"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="input-container c-mb-16">
                    <label
                      htmlFor="email"
                      className="inline-block mb-2 text-sm font-medium text-gray-900"
                    >
                      Your email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      className={`bg-gray-50 border ${
                        errors.email && touched.email
                          ? "border-red-600 bg-red-50"
                          : "border-gray-300"
                      } text-gray-900 rounded-lg block w-full p-2.5`}
                      placeholder="name@company.com"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error-message"
                    />
                  </div>

                  {/* Mobile Number Field */}
                  <div className="input-container c-mb-16">
                    <label
                      htmlFor="userMobile"
                      className="inline-block mb-2 text-sm font-medium text-gray-900"
                    >
                      Your mobile number
                    </label>
                    <PhoneInput
                      name="userMobile"
                      id="userMobile"
                      defaultCountry="in"
                      forceDialCode={true}
                      value={initialValues.userMobile}
                      onChange={(value) => setFieldValue("userMobile", value)}
                      className={`userMobile ${
                        errors.userMobile && touched.userMobile
                          ? "error-show"
                          : "border-gray-300"
                      }`}
                    />
                    <ErrorMessage
                      name="userMobile"
                      component="div"
                      className="error-message"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="input-container c-mb-16">
                    <label
                      htmlFor="password"
                      className="inline-block mb-2 text-sm font-medium text-gray-900"
                    >
                      Password
                    </label>
                    <Field
                      type={isPasswordVisible ? "text" : "password"}
                      name="password"
                      id="password"
                      className={`bg-gray-50 border ${
                        errors.password && touched.password
                          ? "border-red-600 bg-red-50"
                          : "border-gray-300"
                      } text-gray-900 rounded-lg block w-full p-2.5`}
                      placeholder="••••••••"
                    />
                    <span
                      className={`icon-container ${
                        errors.password && touched.password
                          ? "text-error-300"
                          : "text-gray-400"
                      }`}
                      onClick={togglePasswordVisibility}
                    >
                      {isPasswordVisible ? <RiEyeCloseLine /> : <RiEyeLine />}
                    </span>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="error-message"
                    />
                  </div>

                  {/* Confirm Password Field */}
                  <div className="input-container c-mb-22">
                    <label
                      htmlFor="confirmPassword"
                      className="inline-block mb-2 text-sm font-medium text-gray-900"
                    >
                      Confirm password
                    </label>
                    <Field
                      type={isConfirmPasswordVisible ? "text" : "password"}
                      name="confirmPassword"
                      id="confirmPassword"
                      className={`bg-gray-50 border ${
                        errors.confirmPassword && touched.confirmPassword
                          ? "border-red-600 bg-red-50"
                          : "border-gray-300"
                      } text-gray-900 rounded-lg block w-full p-2.5`}
                      placeholder="••••••••"
                    />
                    <span
                      className={`icon-container ${
                        errors.confirmPassword && touched.confirmPassword
                          ? "text-error-300"
                          : "text-gray-400"
                      }`}
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {isConfirmPasswordVisible ? (
                        <RiEyeCloseLine />
                      ) : (
                        <RiEyeLine />
                      )}
                    </span>
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="error-message"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="register-button-wrap flex justify-between flex-col gap-2">
                    <button
                      type="submit"
                      className="w-full text-white bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-3 text-center disabled:opacity-70 ease-in-out duration-100"
                      disabled={!isValid || !dirty || loading}
                    >
                      {loading ? (
                        <SyncLoader margin={1} size={8} color={"#fff"} />
                      ) : (
                        "Create account"
                      )}
                    </button>
                    <div className="divider">OR</div>
                    <button
                      type="button"
                      className="w-full text-gray-500 bg-white hover:bg-gray-100 border border-button-border-light font-medium rounded-lg text-sm px-5 py-3 text-center ease-in-out duration-100 flex gap-2 justify-center items-center"
                    >
                      <img
                        src="/public/assets/img/google.svg"
                        className="google-btn-icon"
                        alt="Google"
                        title=""
                      />
                      Create account with Google
                    </button>
                  </div>

                  {/* Login Link */}
                  <p className="text-sm font-light text-gray-400 text-center">
                    Already have an account?
                    <Link
                      to="/sign-up"
                      className="font-medium text-gray-400 hover:text-primary-600 hover:underline ml-1"
                    >
                      Login
                    </Link>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModel;
