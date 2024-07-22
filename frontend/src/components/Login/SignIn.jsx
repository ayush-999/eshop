import { Link } from "react-router-dom";
import "./SignIn.css";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { TypeAnimation } from "react-type-animation";

const SignInPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <section className="bg-gray-100">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          to="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        >
          <img
            className="w-auto h-12 mr-2"
            src="img/logo-black.png"
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
                          ? "border-error-600 bg-error-10 focus-within:border-error-600"
                          : "border-gray-300"
                      } text-gray-900 rounded-lg bg-white focus-within:border-primary-600 block w-full p-2.5`}
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
                          ? "border-error-600 bg-error-10 focus-within:border-error-600"
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
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:bg-primary-600 font-medium rounded-lg text-sm px-5 py-3 text-center disabled:opacity-70"
                    disabled={!isValid}
                  >
                    Sign In
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
