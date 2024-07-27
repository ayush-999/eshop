import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import SignUpInfo from "./SignUpInfo";
import PersonalInfo from "./PersonalInfo";
import OtherInfo from "./OtherInfo";
import { server } from "../../server";
import { TypeAnimation } from "react-type-animation";
const SignUp = () => {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const FormTitles = ["step-1", "step-2", "step-3"];
  const navigate = useNavigate();

  const initialValues = {
    fname: "",
    email: "",
    userPic: null,
    userMobile: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = [
    Yup.object().shape({
      fname: Yup.string().required("Full name is required"),
    }),
    Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      userMobile: Yup.string()
        .required("Mobile number is required")
        .matches(/^\+\d{1,3}\d{3,}$/, "Invalid mobile number"),
    }),
    Yup.object().shape({
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
  ];

  const handleSubmit = async (values) => {
    setLoading(true);
    const newForm = new FormData();
    newForm.append("name", values.fname);
    newForm.append("email", values.email);
    if (values.userPic) {
      newForm.append("file", values.userPic);
    }
    newForm.append("userMobile", values.userMobile);
    newForm.append("password", values.password);
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    axios
      .post(`${server}/user/create-user`, newForm, config)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error("An error occurred. Please try again.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const isNextDisabled = (errors, touched, values) => {
    if (page === 0) {
      return !values.fname || errors.fname;
    } else if (page === 1) {
      return (
        !values.email || errors.email || !values.userMobile || errors.userMobile
      );
    } else if (page === 2) {
      return (
        errors.password ||
        !values.password ||
        errors.confirmPassword ||
        !values.confirmPassword
      );
    }
    return false;
  };

  const getProgressBarColor = () => {
    if (page === 0) {
      return "bg-primary-300";
    } else if (page === 1) {
      return "bg-yellow-300";
    } else {
      return "bg-green-300";
    }
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
            src="assets/img/logo-black.png"
            alt="logo"
          />
        </Link>
        <div className="relative w-full bg-white rounded-t-[5px] rounded-b-[15px] shadow md:mt-0 sm:max-w-md xl:p-0">
          <div
            className={`absolute progress-bar top-0 bottom-0 left-0 rounded-[5px] ${getProgressBarColor()}`}
            style={{
              width: page === 0 ? "33.34%" : page === 1 ? "66.33%" : "100%",
            }}
          ></div>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              <TypeAnimation
                sequence={["Sign Up here", 1000]}
                speed={50}
                wrapper="span"
                cursor={false}
                repeat={0}
                t
              />
            </h1>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema[page]}
              onSubmit={(values, { setTouched }) => {
                if (page === FormTitles.length - 1) {
                  handleSubmit(values);
                } else {
                  setTouched({});
                  setPage(page + 1);
                }
              }}
            >
              {({
                errors,
                touched,
                setFieldValue,
                setFieldTouched,
                values,
              }) => (
                <Form>
                  {page === 0 && (
                    <SignUpInfo
                      formData={values}
                      setFormData={setFieldValue}
                      errors={errors}
                      touched={touched}
                    />
                  )}
                  {page === 1 && (
                    <PersonalInfo
                      formData={values}
                      setFormData={setFieldValue}
                      errors={errors}
                      touched={touched}
                      setFieldValue={setFieldValue}
                      setFieldTouched={setFieldTouched}
                      values={values}
                    />
                  )}
                  {page === 2 && (
                    <OtherInfo
                      formData={values}
                      setFormData={setFieldValue}
                      errors={errors}
                      touched={touched}
                    />
                  )}
                  <div className="flex justify-end mt-5">
                    <button
                      type="button"
                      className="text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:bg-primary-600 font-medium rounded-lg text-sm px-5 py-3 text-center mr-2"
                      onClick={() => {
                        if (page === 0) {
                          navigate("/sign-in");
                        } else {
                          setPage((currPage) => currPage - 1);
                        }
                      }}
                    >
                      {page === 0 ? "Go to Login" : "Back"}
                    </button>
                    <button
                      type="submit"
                      className="text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:bg-primary-600 font-medium rounded-lg text-sm px-5 py-3 text-center disabled:opacity-70"
                      disabled={
                        isNextDisabled(errors, touched, values) || loading
                      }
                    >
                      {loading ? (
                        <SyncLoader margin={1} size={8} color={"#fff"} />
                      ) : page === FormTitles.length - 1 ? (
                        "Submit"
                      ) : (
                        "Next"
                      )}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
