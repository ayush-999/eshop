import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./SideBar.css";
import { GoChevronUp, GoChevronDown, GoChevronRight } from "react-icons/go";
import { LuUserCircle2 } from "react-icons/lu";
import { MdOutlineFolderShared, MdOutlinePayment } from "react-icons/md";
import { PiPackage } from "react-icons/pi";
import { IoLogOutOutline } from "react-icons/io5";
import { useLocation, Link } from "react-router-dom";

const ProfileSideBar = () => {
  const { user } = useSelector((state) => state.user);
  const [openIndex, setOpenIndex] = useState(-1);
  const location = useLocation();

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
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-sm mb-3">
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

      <div className="bg-white p-4 rounded-lg shadow-sm accordion-wrapper">
        <button className="accordion-btn px-2 py-3 mb-2 border-b w-full accordion-orderBtn">
          <span className="flex justify-start items-center gap-2">
            <PiPackage className="w-5 h-5" />
            My orders
          </span>
          <GoChevronRight className="w-5 h-5" />
        </button>

        <div className="accordion-item border-b last:border-b-0 mb-2 border-gray-200">
          <div
            className={`accordion-header px-2 py-3 ${
              openIndex === 0 ? "bg-primary-600 text-white rounded-lg" : ""
            }`}
            onClick={() => toggleAccordion(0)}
          >
            <div className="flex justify-start items-center gap-2">
              <LuUserCircle2 className="w-5 h-5" />
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
              <MdOutlineFolderShared className="w-5 h-5" />
              <h4 className="text-[15px]">My Stuff</h4>
            </div>
            {openIndex === 1 ? <GoChevronUp /> : <GoChevronDown />}
          </div>
          {openIndex === 1 && (
            <div className="accordion-content p-4">
              <Link
                to="#"
                className="flex items-center justify-start gap-2 px-2 py-2 text-sm hover:rounded-lg text-gray-600 hover:bg-primary-20 hover:text-gray-900"
              >
                My Coupons
              </Link>
              <Link
                to="#"
                className="flex items-center justify-start gap-2 px-2 py-2 text-sm hover:rounded-lg text-gray-600 hover:bg-primary-20 hover:text-gray-900"
              >
                My Reviews & Ratings
              </Link>
              <Link
                to="#"
                className="flex items-center justify-start gap-2 px-2 py-2 text-sm hover:rounded-lg text-gray-600 hover:bg-primary-20 hover:text-gray-900"
              >
                All Notifications
              </Link>
              <Link
                to="/account/wishlist"
                className={`flex items-center justify-start gap-2 px-2 py-2 text-sm mb-1 hover:rounded-lg hover:bg-primary-20 hover:text-gray-900 ${
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
              <MdOutlinePayment className="w-5 h-5" />
              <h4 className="text-[15px]">Payments</h4>
            </div>
            {openIndex === 2 ? <GoChevronUp /> : <GoChevronDown />}
          </div>
          {openIndex === 2 && (
            <div className="accordion-content p-4">
              <Link
                to="#"
                className="flex items-center justify-start gap-2 px-2 py-2 text-sm hover:rounded-lg text-gray-600 hover:bg-primary-20 hover:text-gray-900"
              >
                Saved Cards
              </Link>
            </div>
          )}
        </div>

        <button className="accordion-btn px-2 py-3 w-full accordion-logoutBtn">
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
