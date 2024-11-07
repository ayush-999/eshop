import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PhoneInput } from "react-international-phone";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { server } from "../../server";
import { SyncLoader } from "react-spinners";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../Loader/LoadingSpinner";

const ProfileInformation = () => {
  const { user, dataLoading } = useSelector((state) => state.user) || {};
  const dispatch = useDispatch();
  const [isPersonalEdit, setIsPersonalEdit] = useState(false);
  const [isContactEdit, setIsContactEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePersonalEdit = () => setIsPersonalEdit(!isPersonalEdit);
  const toggleContactEdit = () => setIsContactEdit(!isContactEdit);

  // Validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Full name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .required("Mobile number is required")
      .matches(/^\+\d{1,3}\d{3,}$/, "Invalid mobile number"),
    gender: Yup.string().oneOf(
      ["male", "female", "other"],
      "Please select a gender"
    ),
  });

  const initialValues = {
    name: user?.name || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber?.toString() || "",
    gender: user?.gender || "male",
  };

  const handleSubmit = async (values) => {
    const updates = {};
    setLoading(true);
    Object.keys(values).forEach((key) => {
      if (values[key] !== initialValues[key]) {
        updates[key] = values[key];
      }
    });
    if (Object.keys(updates).length === 0) {
      toast.warning("No changes to update.");
      return;
    }
    try {
      const res = await axios.put(
        `${server}/user/edit-user/${user._id}`,
        updates,
        {
          withCredentials: true,
        }
      );
      dispatch({ type: "UPDATE_USER", payload: res.data.user });
      toast.success(res.data.message);
    } catch (err) {
      if (err.res && err.res.data && err.res.data.message) {
        toast.error(err.res.data.message);
        console.error("Failed to update profile:", err);
      } else {
        toast.error("An error occurred. Please try again.");
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {dataLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="profile-info-wrapper mb-8">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, setFieldValue }) => (
                <Form>
                  <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-6">
                      <div className="flex justify-start gap-4 items-center mb-3">
                        <h1 className="text-lg font-medium">
                          Personal Information
                        </h1>
                        <button
                          type="button"
                          onClick={togglePersonalEdit}
                          className="text-primary-500 font-medium rounded-lg text-sm hover:underline hover:text-primary-600"
                        >
                          {isPersonalEdit ? "Cancel" : "Edit"}
                        </button>
                      </div>
                      <div className="information-wrapper">
                        {/* Full Name */}
                        <div className="input-container mb-4">
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
                            disabled={!isPersonalEdit}
                            className={`bg-gray-50 border ${
                              errors.name && touched.name
                                ? "border-red-600 bg-red-50"
                                : "border-gray-300"
                            } text-gray-900 rounded-lg block w-full p-2.5 disabled:bg-gray-100 disabled:text-gray-500`}
                            placeholder="Enter full name"
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="error-message"
                          />
                        </div>

                        {/* Gender */}
                        <div className="input-container mb-[20px]">
                          <label className="inline-block mb-[20px] text-sm font-medium text-gray-900">
                            Your Gender
                          </label>
                          <div className="flex">
                            {["male", "female", "other"].map((genderOption) => (
                              <label
                                htmlFor="gender"
                                key={genderOption}
                                className="flex items-center me-4 mb-2"
                              >
                                <Field
                                  type="radio"
                                  name="gender"
                                  id="gender"
                                  value={genderOption}
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                  disabled={!isPersonalEdit}
                                />
                                <span className="ms-2 text-sm font-normal text-gray-900 capitalize">
                                  {genderOption}
                                </span>
                              </label>
                            ))}
                          </div>
                          <ErrorMessage
                            name="gender"
                            component="div"
                            className="error-message"
                          />
                        </div>

                        {isPersonalEdit && (
                          <div className="input-container">
                            <button
                              type="submit"
                              className="bg-primary-600 hover:bg-primary-700 text-white rounded-lg py-2 px-6 font-normal md:text-sm"
                            >
                              {loading ? (
                                <SyncLoader
                                  margin={1}
                                  size={8}
                                  color={"#fff"}
                                />
                              ) : (
                                "Save"
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-span-6">
                      <div className="flex justify-start gap-4 items-center mb-3">
                        <h1 className="text-lg font-medium">
                          Contact Information
                        </h1>
                        <button
                          type="button"
                          onClick={toggleContactEdit}
                          className="text-primary-500 font-medium rounded-lg text-sm hover:underline hover:text-primary-600"
                        >
                          {isContactEdit ? "Cancel" : "Edit"}
                        </button>
                      </div>
                      <div className="information-wrapper">
                        {/* Email */}
                        <div className="input-container mb-4">
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
                            disabled={true}
                            className={`bg-gray-50 border ${
                              errors.email && touched.email
                                ? "border-red-600 bg-red-50"
                                : "border-gray-300"
                            } text-gray-900 rounded-lg block w-full p-2.5 disabled:bg-gray-100 disabled:text-gray-500`}
                            placeholder="name@company.com"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="error-message"
                          />
                        </div>

                        {/* Mobile Number */}
                        <div className="input-container mb-8">
                          <label
                            htmlFor="phoneNumber"
                            className="inline-block mb-2 text-sm font-medium text-gray-900"
                          >
                            Your mobile number
                          </label>
                          <PhoneInput
                            name="phoneNumber"
                            id="phoneNumber"
                            value={initialValues.phoneNumber}
                            onChange={(value) =>
                              setFieldValue("phoneNumber", value)
                            }
                            defaultCountry="in"
                            forceDialCode={true}
                            disabled={!isContactEdit}
                            className={`userMobile ${
                              errors.phoneNumber && touched.phoneNumber
                                ? "border-red-600 bg-red-50"
                                : "border-gray-300"
                            }`}
                          />
                          <ErrorMessage
                            name="phoneNumber"
                            component="div"
                            className="error-message"
                          />
                        </div>
                        {isContactEdit && (
                          <div className="input-container">
                            <button
                              type="submit"
                              className="bg-primary-600 hover:bg-primary-700 text-white rounded-lg py-2 px-6 font-normal md:text-sm"
                            >
                              {loading ? (
                                <SyncLoader
                                  margin={1}
                                  size={8}
                                  color={"#fff"}
                                />
                              ) : (
                                "Save"
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className="profile-faq-wrapper mb-10">
            <h2 className="text-lg font-medium mb-4">FAQs</h2>
            <div className="profile-faq-wrap mb-3">
              <h5 className="profile-faq-q text-sm font-medium mb-3">
                What happens when I update my email address (or mobile number)?
              </h5>
              <p className="profile-faq-a text-sm font-normal">
                Your login email id (or mobile number) changes, likewise. You'll
                receive all your account related communication on your updated
                email address (or mobile number).
              </p>
            </div>

            <div className="profile-faq-wrap mb-3">
              <h5 className="profile-faq-q text-sm font-medium mb-3">
                When will my eshop account be updated with the new email address
                (or mobile number)?
              </h5>
              <p className="profile-faq-a text-sm font-normal">
                It happens as soon as you confirm the verification code sent to
                your email (or mobile) and save the changes.
              </p>
            </div>

            <div className="profile-faq-wrap mb-3">
              <h5 className="profile-faq-q text-sm font-medium mb-3">
                What happens to my existing eshop account when I update my email
                address (or mobile number)?
              </h5>
              <p className="profile-faq-a text-sm font-normal">
                Updating your email address (or mobile number) doesn't
                invalidate your account. Your account remains fully functional.
                You'll continue seeing your Order history, saved information and
                personal details.
              </p>
            </div>

            <div className="profile-faq-wrap mb-3">
              <h5 className="profile-faq-q text-sm font-medium mb-3">
                Does my Seller account get affected when I update my email
                address?
              </h5>
              <p className="profile-faq-a text-sm font-normal">
                eshop has a 'single sign-on' policy. Any changes will reflect in
                your Seller account also.
              </p>
            </div>
          </div>
          <div className="profile-delete-wrapper flex justify-start items-center">
            <div className="flex justify-between items-center gap-2">
              <button
                type="submit"
                className="text-white hover:bg-error-900 bg-error-800 rounded-lg py-2 px-4 font-semibold md:text-sm"
              >
                Delete Account
              </button>
              <button
                type="submit"
                className="text-error-800 hover:text-error-800 hover:bg-error-100 rounded-lg py-2 px-4 font-semibold md:text-sm"
              >
                Deactivate Account
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProfileInformation;
