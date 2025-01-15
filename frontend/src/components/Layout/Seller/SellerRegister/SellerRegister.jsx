/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import "./SellerRegister.css";
import { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { SyncLoader } from "react-spinners";
import { TypeAnimation } from "react-type-animation";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { server } from "../../../../server";
import { toast } from "react-toastify";
import { PhoneInput } from "react-international-phone";
import OtpModel from "../../../../models/OtpModel/OtpModel";

const SellerRegister = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOtpPopupOpen, setIsOtpPopupOpen] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .required("Mobile number is required")
      .matches(/^\+\d{1,3}\d{3,}$/, "Invalid mobile number"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
    phoneNumber: phoneNumber || "",
  };

  const handleSubmit = async (values) => {
    // setLoading(true);
    alert("Clicked");
  };

  const handleSendOtp = () => {
    const strippedPhoneNumber = phoneNumber.replace(/^\+\d{1,3}/, "").trim();
    if (!strippedPhoneNumber) {
      setPhoneError("Mobile number is required");
    } else {
      setPhoneError("");
      setIsOtpPopupOpen(true);
    }
  };

  return (
    <>
      <section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link
            to="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
          >
            <img
              className="w-auto h-12 mr-2"
              src="assets/img/logo-black.png"
              alt="logo"
            />
          </Link>
          <div className="w-full bg-white rounded-[.9375rem] shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                <TypeAnimation
                  sequence={["Create your account to start selling", 1000]}
                  speed={50}
                  wrapper="span"
                  cursor={false}
                  repeat={0}
                />
              </h1>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, isValid, setFieldValue }) => (
                  <Form className="space-y-3 md:space-y-4">
                    <div className="input-container c-mb-20">
                      <div className="flex items-center justify-start gap-1 mb-2">
                        <label
                          htmlFor="phoneNumber"
                          className="inline-block text-sm font-semibold text-gray-900"
                        >
                          Enter mobile number
                        </label>
                        <p className="flex items-center justify-start gap-1 rounded-[5px] border border-dashed border-green-600 py-[1px] px-2 bg-green-50 text-xs ms-2 text-green-600 font-semibold">
                          <RiVerifiedBadgeFill />
                          Verified
                        </p>
                      </div>
                      <div className="flex items-center justify-between gap-1">
                        <PhoneInput
                          name="phoneNumber"
                          id="phoneNumber"
                          value={phoneNumber}
                          onChange={(value) => {
                            setPhoneNumber(value);
                            setFieldValue("phoneNumber", value);
                          }}
                          defaultCountry="in"
                          forceDialCode={true}
                          className={`phoneNumber ${
                            errors.phoneNumber && touched.phoneNumber
                              ? "border-red-600 bg-red-50 phoneNumber-error"
                              : "border-gray-300"
                          } w-3/4`}
                        />
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          className="w-4/4 text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:bg-primary-600 font-semibold rounded-lg text-sm px-[14px] py-[10px] text-center disabled:opacity-70 ease-in-out duration-100"
                        >
                          {loading ? (
                            <SyncLoader margin={1} size={8} color={"#fff"} />
                          ) : (
                            "Send OTP"
                          )}
                        </button>
                      </div>
                      {phoneError && (
                        <div
                          className="error-message"
                          style={{ bottom: "-1.3rem" }}
                        >
                          {phoneError}
                        </div>
                      )}
                      <ErrorMessage
                        name="phoneNumber"
                        component="div"
                        className="error-message mb-4"
                      />
                    </div>

                    <div className="input-container">
                      <label
                        htmlFor="email"
                        className="inline-block mb-2 text-sm font-semibold text-gray-900"
                      >
                        Enter email id
                      </label>
                      <Field
                        type="email"
                        name="email"
                        id="email"
                        className={`bg-gray-50 border ${
                          errors.email && touched.email
                            ? "border-red-600 bg-red-50 focus-within:border-red-600"
                            : "border-gray-300"
                        } text-gray-900 rounded-lg focus-within:border-primary-600 block w-full p-2.5`}
                        placeholder="name@company.com"
                        autoComplete="off"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div className="input-with-icon-container c-mb-20">
                      <label
                        htmlFor="password"
                        className="inline-block mb-2 text-sm font-semibold text-gray-900"
                      >
                        Enter password
                      </label>
                      <Field
                        type={isPasswordVisible ? "text" : "password"}
                        name="password"
                        id="password"
                        className={`bg-gray-50 border ${
                          errors.password && touched.password
                            ? "border-red-600 bg-red-50 focus-within:border-red-600"
                            : "border-gray-300"
                        } text-gray-900 rounded-lg focus-within:border-primary-600 block w-full p-2.5 input-with-icon`}
                        placeholder="••••••••"
                        autoComplete="off"
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

                    <button
                      type="submit"
                      className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:bg-primary-600 font-semibold rounded-lg text-sm px-5 py-3 text-center disabled:opacity-70 ease-in-out duration-100"
                      disabled={!isValid || loading}
                    >
                      {loading ? (
                        <SyncLoader margin={1} size={8} color={"#fff"} />
                      ) : (
                        "Create Account"
                      )}
                    </button>
                    <p className="text-xs font-light text-gray-400 text-center">
                      By clicking you agree to our{" "}
                      <Link to="#" className="text-primary-600 font-normal">
                        {" "}
                        Terms & Conditions
                      </Link>{" "}
                      and{" "}
                      <Link to="#" className="text-primary-600 font-normal">
                        Privacy Policy
                      </Link>
                    </p>
                    <p className="text-sm font-normal text-gray-400 text-center">
                      Already have an account?
                      <Link
                        to="/seller-login"
                        className="font-semibold text-gray-400 hover:text-primary-600 hover:underline ml-1"
                      >
                        Go to Login
                      </Link>
                    </p>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>

      {isOtpPopupOpen && <OtpModel setOpen={setIsOtpPopupOpen} />}
    </>
  );
};

export default SellerRegister;
