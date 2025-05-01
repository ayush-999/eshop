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
import { server } from "../../../../server";
import { toast } from "react-toastify";

const SellerRegister = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };
  
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(`${server}/seller/create-seller`, values, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        // No need to navigate here - activation email will handle the flow
      } else {
        toast.error(res.data.message || "Registration failed");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
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
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-lg font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
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
                {({ errors, touched, isValid, dirty }) => (
                  <Form className="space-y-4 md:space-y-6">
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
                            ? "border-red-600 bg-red-50 focus-within:border-red-600 placeholder:text-error-300"
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

                    <div className="input-with-icon-container c-mb-30">
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
                            ? "border-red-600 bg-red-50 focus-within:border-red-600 placeholder:text-error-300"
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
                      disabled={!isValid || !dirty || loading}
                    >
                      {loading ? (
                        <SyncLoader margin={1} size={8} color={"#fff"} />
                      ) : (
                        "Create Account"
                      )}
                    </button>
                    <p className="text-[10px] font-light text-gray-400 text-center">
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
                        Go to login
                      </Link>
                    </p>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SellerRegister;
