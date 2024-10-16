/* eslint-disable react/prop-types */
import { Field, ErrorMessage } from "formik";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import "./SellerRegister.css";

const PersonalInfo = ({
  errors,
  touched,
  setFieldValue,
  values,
  setFieldTouched,
}) => {
  return (
    <>
      <div className="space-y-4 md:space-y-4">
        <div>
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
            placeholder="Enter your email"
            autoComplete="email"
          />
          <ErrorMessage
            name="email"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="userMobile"
            className="inline-block mb-2 text-sm font-medium text-gray-900"
          >
            Your Mobile number
          </label>
          <PhoneInput
            name="userMobile"
            id="userMobile"
            defaultCountry="in"
            value={values.userMobile}
            onChange={(phone) => {
              setFieldValue("userMobile", phone);
            }}
            onBlur={() => {
              setFieldTouched("userMobile", true);
            }}
            className={`userMobile ${
              errors.userMobile && touched.userMobile
                ? "error-show"
                : "border-gray-300"
            }`}
          />
          <ErrorMessage
            name="userMobile"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
      </div>
    </>
  );
};
export default PersonalInfo;
