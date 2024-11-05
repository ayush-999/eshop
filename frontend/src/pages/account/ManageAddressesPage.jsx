import { useState } from "react";
import axios from "axios";
import { LuPlus } from "react-icons/lu";
import { TbHome } from "react-icons/tb";
import { PhoneInput } from "react-international-phone";
import { MdOutlineWorkOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { server } from "../../server";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";
import { HiDotsVertical } from "react-icons/hi";
import "./AccountPage.css";

const ManageAddressesPage = () => {
  const [addressType, setAddressType] = useState("home");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { user } = useSelector((state) => state.user) || {};
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { handleProfileRefresh } = useOutletContext();

  const initialValues = {
    addressType: "",
    name: "",
    userPhone: "",
    country: "",
    state: "",
    userAddress: "",
    city: "",
    pincode: "",
    landmark: "",
    userAlternatePhone: "",
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    const newAddress = { ...values, addressType };
    try {
      debugger;
      const res = await axios.post(
        `${server}/user/add-address/${user._id}`,
        { newAddress },
        { withCredentials: true }
      );
      dispatch({ type: "UPDATE_USER", payload: res.data.user });
      toast.success(res.data.message);
      handleProfileRefresh();
      navigate("/account/addresses");
      setIsFormVisible(false);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
        console.error("Failed to add address:", err);
      } else {
        toast.error("An error occurred. Please try again.");
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="address-info-wrapper">
        <div className="grid grid-cols-12">
          <div className="col-span-12">
            <div className="flex justify-start items-center mb-5">
              <h1 className="text-lg font-medium">Manage Addresses</h1>
            </div>
            <div className="add-address-wrapper rounded-lg p-2 border border-dashed border-primary-200 mb-6">
              {!isFormVisible && (
                <button
                  type="button"
                  onClick={() => setIsFormVisible(true)}
                  className="flex items-center justify-center gap-2 add-address-btn w-full py-3 px-3 transition-all bg-primary-50 text-primary-500 font-semibold rounded-lg hover:bg-primary-100 hover:text-primary-600"
                >
                  <LuPlus className="text-lg" />
                  <span className="text-sm"> Add a new address </span>
                </button>
              )}
              {isFormVisible && (
                <div className="add-address-form bg-primary-10 p-5 rounded-lg">
                  <h1 className="text-[18px] mb-3 font-semibold text-gray-900 text-center">
                    Add a new address
                  </h1>
                  <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {({ errors, touched, setFieldValue }) => (
                      <Form>
                        <div className="grid grid-cols-12 gap-x-4">
                          {/* Address Type */}
                          <div className="col-span-12 mb-3">
                            <div className="input-container">
                              <label
                                htmlFor="address-type"
                                className="inline-block mb-3 text-sm font-medium text-gray-900"
                              >
                                Address Type{" "}
                                <span className="text-red-500">*</span>
                              </label>
                              <div className="flex justify-start items-center gap-3">
                                <label
                                  className={`flex items-center justify-center gap-2 py-2 px-8 font-semibold text-sm rounded-lg cursor-pointer transition-all hover:bg-primary-600 hover:text-white ${
                                    addressType === "home"
                                      ? "bg-primary-600 text-white"
                                      : "text-primary-600"
                                  }`}
                                >
                                  <TbHome className="text-[16px]" />
                                  <Field
                                    type="radio"
                                    name="addressType"
                                    value="home"
                                    checked={addressType === "home"}
                                    onChange={() => setAddressType("home")}
                                    className="hidden"
                                  />
                                  Home
                                </label>
                                <label
                                  className={`flex items-center justify-center gap-2 py-2 px-8 font-semibold text-sm rounded-lg cursor-pointer transition-all hover:bg-primary-600 hover:text-white ${
                                    addressType === "work"
                                      ? "bg-primary-600 text-white"
                                      : "text-primary-600"
                                  }`}
                                >
                                  <MdOutlineWorkOutline className="text-[16px]" />
                                  <Field
                                    type="radio"
                                    name="addressType"
                                    value="work"
                                    checked={addressType === "work"}
                                    onChange={() => setAddressType("work")}
                                    className="hidden"
                                  />
                                  Work
                                </label>
                              </div>
                            </div>
                          </div>
                          {/* Name */}
                          <div className="col-span-6">
                            <div className="input-container mb-3">
                              <label
                                htmlFor="name"
                                className="inline-block mb-2 text-sm font-medium text-gray-900"
                              >
                                Your full name{" "}
                                <span className="text-red-500">*</span>
                              </label>
                              <Field
                                type="text"
                                name="name"
                                id="name"
                                className={`bg-gray-50 border text-gray-900 rounded-lg block w-full p-3 text-sm`}
                                placeholder="Enter full name"
                                required
                              />
                            </div>
                          </div>
                          {/* Phone Number */}
                          <div className="col-span-6">
                            <div className="input-container mb-3">
                              <label
                                htmlFor="userPhone"
                                className="inline-block mb-2 text-sm font-medium text-gray-900"
                              >
                                Your mobile number{" "}
                                <span className="text-red-500">*</span>
                              </label>
                              <PhoneInput
                                name="userPhone"
                                id="userPhone"
                                onChange={(value) =>
                                  setFieldValue("userPhone", value)
                                }
                                defaultCountry="in"
                                forceDialCode={true}
                                className={`userMobile`}
                                required
                              />
                            </div>
                          </div>
                          {/* Country */}
                          <div className="col-span-6">
                            <div className="input-container mb-3">
                              <label
                                htmlFor="country"
                                className="inline-block mb-2 text-sm font-medium text-gray-900"
                              >
                                Country <span className="text-red-500">*</span>
                              </label>
                              <Field
                                type="text"
                                name="country"
                                id="country"
                                className={`bg-gray-50 border text-gray-900 rounded-lg block w-full p-3 text-sm`}
                                placeholder="Country"
                                required
                              />
                            </div>
                          </div>
                          {/* State */}
                          <div className="col-span-6">
                            <div className="input-container mb-3">
                              <label
                                htmlFor="state"
                                className="inline-block mb-2 text-sm font-medium text-gray-900"
                              >
                                State <span className="text-red-500">*</span>
                              </label>
                              <Field
                                type="text"
                                name="state"
                                id="state"
                                className={`bg-gray-50 border text-gray-900 rounded-lg block w-full p-3 text-sm`}
                                placeholder="State"
                                required
                              />
                            </div>
                          </div>
                          {/* Address */}
                          <div className="col-span-12">
                            <div className="input-container mb-3">
                              <label
                                htmlFor="userAddress"
                                className="inline-block mb-2 text-sm font-medium text-gray-900"
                              >
                                Address (Area and Street){" "}
                                <span className="text-red-500">*</span>
                              </label>
                              <Field
                                component="textarea"
                                type="text"
                                name="userAddress"
                                id="userAddress"
                                rows="2"
                                className={`bg-gray-50 border text-gray-900 rounded-lg block w-full p-3 text-sm`}
                                placeholder="Address (Area and Street)"
                                required
                              />
                            </div>
                          </div>
                          {/* City */}
                          <div className="col-span-6">
                            <div className="input-container mb-3">
                              <label
                                htmlFor="city"
                                className="inline-block mb-2 text-sm font-medium text-gray-900"
                              >
                                City/ District/ Town{" "}
                                <span className="text-red-500">*</span>
                              </label>
                              <Field
                                type="text"
                                name="city"
                                id="city"
                                className={`bg-gray-50 border text-gray-900 rounded-lg block w-full p-3 text-sm`}
                                placeholder="City/District/Town"
                                required
                              />
                            </div>
                          </div>
                          {/* Pincode */}
                          <div className="col-span-6">
                            <div className="input-container mb-3">
                              <label
                                htmlFor="pincode"
                                className="inline-block mb-2 text-sm font-medium text-gray-900"
                              >
                                Pincode <span className="text-red-500">*</span>
                              </label>
                              <Field
                                type="text"
                                name="pincode"
                                id="pincode"
                                className={`bg-gray-50 border text-gray-900 rounded-lg block w-full p-3 text-sm`}
                                placeholder="Pincode"
                                required
                              />
                            </div>
                          </div>
                          {/* landmark */}
                          <div className="col-span-6">
                            <div className="input-container mb-8">
                              <label
                                htmlFor="landmark"
                                className="inline-block mb-2 text-sm font-medium text-gray-900"
                              >
                                Landmark
                              </label>
                              <Field
                                type="text"
                                name="landmark"
                                id="landmark"
                                className={`bg-gray-50 border text-gray-900 rounded-lg block w-full p-3 text-sm`}
                                placeholder="Landmark (Optional)"
                              />
                            </div>
                          </div>
                          {/* Alternate Phone */}
                          <div className="col-span-6">
                            <div className="input-container mb-8">
                              <label
                                htmlFor="userAlternatePhone"
                                className="inline-block mb-2 text-sm font-medium text-gray-900"
                              >
                                Alternate Phone
                              </label>
                              <PhoneInput
                                name="userAlternatePhone"
                                id="userAlternatePhone"
                                onChange={(value) =>
                                  setFieldValue("userAlternatePhone", value)
                                }
                                defaultCountry="in"
                                forceDialCode={true}
                                className={`userMobile`}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="address-btn-wrapper flex justify-start items-center">
                          <div className="flex justify-between items-center gap-3">
                            <button
                              type="submit"
                              className="text-white hover:bg-primary-700 bg-primary-600 rounded-lg py-2 px-10 font-semibold md:text-sm transition-all"
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
                            <button
                              type="button"
                              onClick={() => setIsFormVisible(false)}
                              className="text-primary-600 hover:text-primary-600 hover:bg-primary-100 rounded-lg py-2 px-10 font-semibold md:text-sm transition-all"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              )}
            </div>
            <div className="address-wrapper rounded-lg border border-dashed border-primary-200">
              {user?.addresses && user.addresses.length > 0 ? (
                user.addresses.map((address, index) => (
                  <div
                    key={address._id}
                    className="address-view-wrap border-b border-dashed last:border-b-0 border-primary-200 relative"
                  >
                    <div className="address-view-item p-5">
                      <div className="bg-primary-100 py-1 px-3 rounded-[4px] inline-block text-primary-600 text-xs font-semibold capitalize mb-2">
                        {address.addressType}
                      </div>
                      <p className="text-sm mb-2 font-semibold">
                        <span className="me-2">{address.name}</span>
                        <span className="ms-2">+{address.userPhone}</span>
                      </p>
                      <p className="text-sm">
                        <span className="ms-0">{address.userAddress}</span>,
                        {address.landmark && (
                          <span className="ms-1">{address.landmark},</span>
                        )}
                        <span className="ms-1">{address.city}</span>,
                        <span className="ms-1">{address.state}</span>,
                        {address.pincode && (
                          <span className="ms-1">{address.pincode},</span>
                        )}
                        <span className="ms-1">{address.country}</span>
                      </p>
                    </div>
                    <div className="address-menu-wrapper">
                      <div className="address-menu-icon hover:bg-primary-50 hover:text-gray-900">
                        <HiDotsVertical />
                      </div>
                      <ul className="address-menu">
                        <li className="text-[13px] font-normal py-1 px-2 transition-all hover:rounded-[4px] hover:bg-primary-50 hover:text-gray-900 text-gray-600">
                          Edit
                          </li>
                        <li className="text-[13px] font-normal py-1 px-2 transition-all hover:rounded-[4px] hover:bg-primary-50 hover:text-gray-900 text-gray-600">Delete</li>
                      </ul>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-2">
                  <p className="text-sm font-semibold text-center block w-full p-2 text-primary-500 bg-primary-50 rounded-lg">
                    No addresses found
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAddressesPage;
