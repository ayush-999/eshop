import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../../server";
import "./SideBar.css";
import { GoChevronUp, GoChevronDown, GoChevronRight } from "react-icons/go";
import { PiUserCircle  } from "react-icons/pi";
import { AiOutlineBank } from "react-icons/ai";
import { BsFolder } from "react-icons/bs";
import { PiPackage } from "react-icons/pi";
import { IoLogOutOutline } from "react-icons/io5";
import { useLocation, Link } from "react-router-dom";

const ProfileSideBar = () => {
  const { user } = useSelector((state) => state.user);
  const [openIndex, setOpenIndex] = useState(-1);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    // Check the current path and set openIndex based on the page
    if (location.pathname === "/account/profile") {
      setOpenIndex(0); // Profile section
    } else if (location.pathname === "/account/addresses") {
      setOpenIndex(0); // Profile section
    } else if (location.pathname === "/account/wishlist") {
      setOpenIndex(1); // My Stuff section
    } else if (location.pathname === "/account/coupons") {
      setOpenIndex(1); // My Stuff section
    }
  }, [location.pathname]);

  const toggleAccordion = (index) => {
    if (index === -1) {
      setOpenIndex(-1); // Close all accordions when My Orders is clicked
    } else {
      setOpenIndex(openIndex === index ? -1 : index); // Toggle specific accordion
    }
  };

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${server}/user/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        // Update Redux or local state to remove user session
        dispatch({ type: "LOGOUT_USER", payload: res.data.user });
        toast.success(res.data.message);
        // Redirect to login or homepage
        window.location.href = "/";
      } else {
        toast.error("Failed to log out. Please try again.");
      }
    } catch (error) {
      toast.error(error.res?.data?.message || "An error occurred.");
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-xs mb-3 md:block hidden">
        <div className="flex justify-start items-center gap-2 profile-wrapper">
          <img
            src="https://api.dicebear.com/7.x/pixel-art/svg"
            className="w-14 h-14 rounded-full p-1 bg-primary-50"
          />
          <div className="flex flex-col">
            <p className="p-greetings">Hello,</p>
            <h4 className="userTitle">{user ? user.name : "Guest"}</h4>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-xs accordion-wrapper">
        <Link
          to="/account/orders"
          className={`accordion-btn px-2 py-3 mb-2 border-b border-gray-200 w-full accordion-orderBtn ${
            location.pathname === "/account/orders"
              ? "accordion-orderBtn-active"
              : "text-gray-900"
          }`}
          onClick={() => toggleAccordion(-1)} // Close all accordions when "My Orders" is clicked
        >
          <span className="flex justify-start items-center gap-2">
            <PiPackage className="w-5 h-5" />
            <span className="md:block hidden">My orders</span>
          </span>
          <GoChevronRight className="w-5 h-5" />
        </Link>

        <div className="accordion-item border-b last:border-b-0 mb-2 border-gray-200">
          <div
            className={`accordion-header px-2 py-3 ${
              openIndex === 0 ? "bg-primary-600 text-white rounded-lg" : ""
            }`}
            onClick={() => toggleAccordion(0)}
          >
            <div className="flex justify-start items-center gap-2">
              <PiUserCircle  className="w-5 h-5" />
              <h4 className="text-[15px]">Account Settings</h4>
            </div>
            {openIndex === 0 ? <GoChevronUp /> : <GoChevronDown />}
          </div>
          {openIndex === 0 && (
            <div className="accordion-content py-2 px-1">
              <Link
                to="/account/profile"
                className={`flex items-center justify-start gap-2 px-2 py-2 text-sm mb-1 hover:rounded-lg hover:bg-primary-20 hover:text-gray-900 ${
                  location.pathname === "/account/profile"
                    ? "profile-active-link"
                    : "text-gray-600"
                }`}
              >
                Profile Information
              </Link>
              <Link
                to="/account/addresses"
                className={`flex items-center justify-start gap-2 px-2 py-2 text-sm hover:rounded-lg hover:bg-primary-20 hover:text-gray-900 ${
                  location.pathname === "/account/addresses"
                    ? "profile-active-link"
                    : "text-gray-600"
                }`}
              >
                Manage Addresses
              </Link>
            </div>
          )}
        </div>

        <div className="accordion-item border-b last:border-b-0 mb-2 border-gray-200">
          <div
            className={`accordion-header px-2 py-3 ${
              openIndex === 1 ? "bg-primary-600 text-white rounded-lg" : ""
            }`}
            onClick={() => toggleAccordion(1)}
          >
            <div className="flex justify-start items-center gap-2">
              <BsFolder className="w-4 h-4" />
              <h4 className="text-[15px]">My Stuff</h4>
            </div>
            {openIndex === 1 ? <GoChevronUp /> : <GoChevronDown />}
          </div>
          {openIndex === 1 && (
            <div className="accordion-content py-2 px-1">
              <Link
                to="#"
                className="flex items-center justify-start gap-2 px-2 py-2 text-sm hover:rounded-lg text-gray-600 hover:bg-primary-20 hover:text-gray-900 mb-1"
              >
                My Coupons
              </Link>
              <Link
                to="#"
                className="flex items-center justify-start gap-2 px-2 py-2 text-sm hover:rounded-lg text-gray-600 hover:bg-primary-20 hover:text-gray-900 mb-1"
              >
                My Reviews & Ratings
              </Link>
              <Link
                to="#"
                className="flex items-center justify-start gap-2 px-2 py-2 text-sm hover:rounded-lg text-gray-600 hover:bg-primary-20 hover:text-gray-900 mb-1"
              >
                All Notifications
              </Link>
              <Link
                to="/account/wishlist"
                className={`flex items-center justify-start gap-2 px-2 py-2 text-sm hover:rounded-lg hover:bg-primary-20 hover:text-gray-900 ${
                  location.pathname === "/account/wishlist"
                    ? "profile-active-link"
                    : "text-gray-600"
                }`}
              >
                My Wishlist
              </Link>
            </div>
          )}
        </div>

        <div className="accordion-item border-b last:border-b-0 mb-2 border-gray-200">
          <div
            className={`accordion-header px-2 py-3 ${
              openIndex === 2 ? "bg-primary-600 text-white rounded-lg" : ""
            }`}
            onClick={() => toggleAccordion(2)}
          >
            <div className="flex justify-start items-center gap-2">
              <AiOutlineBank className="w-5 h-5" />
              <h4 className="text-[15px]">Bank Details</h4>
            </div>
            {openIndex === 2 ? <GoChevronUp /> : <GoChevronDown />}
          </div>
          {openIndex === 2 && (
            <div className="accordion-content py-2 px-1">
              <Link
                to="/account/wallet"
                className={`flex items-center justify-start gap-2 px-2 py-2 text-sm mb-1 hover:rounded-lg hover:bg-primary-20 hover:text-gray-900 ${
                  location.pathname === "/account/wallet"
                    ? "profile-active-link"
                    : "text-gray-600"
                }`}
              >
                Wallet
              </Link>
              <Link
                to="#"
                className="flex items-center justify-start gap-2 px-2 py-2 text-sm hover:rounded-lg text-gray-600 hover:bg-primary-20 hover:text-gray-900"
              >
                Saved Cards
              </Link>
            </div>
          )}
        </div>

        <button className="accordion-btn px-2 py-3 w-full accordion-logoutBtn" onClick={handleLogout}>
          <span className="flex justify-start items-center gap-2">
            <IoLogOutOutline className="w-5 h-5" />
            <h4 className="text-[15px]">Logout</h4>
          </span>
        </button>
      </div>
    </>
  );
};

export default ProfileSideBar;
