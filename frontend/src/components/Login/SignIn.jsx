/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.css";
import { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { SyncLoader } from "react-spinners";
import { TypeAnimation } from "react-type-animation";
import { server } from "../../server";
import { toast } from "react-toastify";

const SignInPage = () => {
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
    axios
      .post(`${server}/user/login-user`, values, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        toast.success("Login Success!");
        navigate("/");
        window.location.reload()
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          toast.error(err.response.data.message);
          console.log(err);
        } else {
          toast.error("An error occurred. Please try again.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
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
        <div className="w-full bg-white rounded-[15px] shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              <TypeAnimation
                sequence={["Sign In to your account", 1000]}
                speed={50}
                wrapper="span"
                cursor={false}
                repeat={0}
                t
              />
            </h1>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isValid }) => (
                <Form className="space-y-4 md:space-y-4">
                  <div className="input-container">
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
                          ? "border-red-600 bg-red-50 focus-within:border-red-600"
                          : "border-gray-300"
                      } text-gray-900 rounded-lg focus-within:border-primary-600 block w-full p-2.5`}
                      placeholder="name@company.com"
                      autoComplete="email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="input-with-icon-container">
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
                          ? "border-red-600 bg-red-50 focus-within:border-red-600"
                          : "border-gray-300"
                      } text-gray-900 rounded-lg focus-within:border-primary-600 block w-full p-2.5 input-with-icon`}
                      placeholder="••••••••"
                      autoComplete="current-password"
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
                  <div className="flex items-center justify-between forgotPassword">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          name="remember"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded accent-primary-600"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="remember" className="text-gray-400">
                          Remember me
                        </label>
                      </div>
                    </div>
                    <Link
                      to="#"
                      className="text-sm font-medium hover:text-primary-600 text-gray-400 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:bg-primary-600 font-medium rounded-lg text-sm px-5 py-3 text-center disabled:opacity-70 ease-in-out duration-100"
                    disabled={!isValid || loading}
                  >
                    {loading ? (
                      <SyncLoader margin={1} size={8} color={"#fff"} />
                    ) : (
                      "Sign In"
                    )}
                  </button>
                  <p className="text-sm font-light text-gray-400 text-center">
                    Don’t have an account yet?
                    <Link
                      to="/sign-up"
                      className="font-medium text-gray-400 hover:text-primary-600 hover:underline ml-1"
                    >
                      Sign Up
                    </Link>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInPage;
