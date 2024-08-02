import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { LuUserCircle2 } from "react-icons/lu";
import { GoChevronDown, GoChevronUp, GoHeart, GoTag } from "react-icons/go";
import { CiShop } from "react-icons/ci";
import { PiPackage } from "react-icons/pi";
import { IoLogOutOutline, IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineCardGiftcard } from "react-icons/md";
import Select from "react-select";
import "./layout.css";
import { categoriesData, productData } from "../../static/data";
import Navbar from "./Navbar";

const Header = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchDropdownVisible, setSearchDropdownVisible] = useState(false);
  const [topSearches, setTopSearches] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    // Fetch today's top searches when the component mounts
    fetchTopSearches().then((searches) => setTopSearches(searches));

    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setDropdownVisible(false);
      }
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setSearchDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchTopSearches = async () => {
    // Replace this with your actual fetch call or logic to get top searches
    return ["Laptops", "Headphones", "Smartphones", "Cameras", "Watches"];
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim() === "") {
      setSearchData([]);
    } else {
      const filteredProducts =
        productData &&
        productData.filter((product) =>
          product.name.toLowerCase().includes(term.toLowerCase())
        );
      setSearchData(filteredProducts);
    }
    setSearchDropdownVisible(true);
  };

  const renderSearchResults = () => {
    if (searchTerm.trim() === "") {
      return (
        <>
          <li className="py-2 px-2 text-gray-500 font-semibold text-xs mb- flex items-center justify-start gap-2">
            Discover More
          </li>
          {topSearches.map((search, index) => (
            <li
              key={index}
              className="py-2 px-2 text-gray-400 hover:rounded-md text-sm mb-1 font-normal hover:bg-primary-20 cursor-pointer flex items-center justify-start gap-2"
            >
              <FiSearch className="text-gray-500" /> {search}
            </li>
          ))}
        </>
      );
    }

    if (searchData.length > 0) {
      return searchData.map((product, index) => (
        <li
          key={index}
          className="py-2 px-2 text-gray-400 hover:rounded-md text-sm mb-1 font-normal hover:bg-primary-20 cursor-pointer flex items-center justify-start gap-2"
        >
          <Link
            to={`/product/${product.name.replace(/\s+/g, "-")}`}
            className="flex items-center justify-between"
          >
            <img
              src={product.image_Url[0]?.url}
              alt={product.name}
              className="w-8 h-8 object-contain bg-center bg-no-repeat rounded-full mr-2"
            />
            {product.name}
          </Link>
        </li>
      ));
    }

    return (
      <li className="py-2 px-2 text-gray-400 hover:rounded-md text-sm mb-1 font-normal hover:bg-primary-20 cursor-pointer text-center">
        No results found
      </li>
    );
  };

  const categoryOptions = categoriesData.map((category) => ({
    value: category.title,
    label: category.title,
  }));

  return (
    <>
      <header className="bg-white border-gray-200 main-navbar">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-2">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="assets/img/logo-black.png" className="h-8" alt="Eshop" />
          </Link>
          <div className="w-full max-w-xs xl:max-w-2xl 2xl:max-w-2xl bg-primary-40 rounded-md hidden xl:flex items-center relative">
            <Select
              options={categoryOptions}
              className="basic-single"
              classNamePrefix="eshop"
              placeholder="All Categories"
              styles={{
                control: (provided) => ({
                  ...provided,
                  width: "132px",
                  background: "transparent",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "rgb(75 85 99)",
                  border: 0,
                  ":hover": {
                    boxShadow: "none",
                    borderColor: "transparent",
                  },
                }),
                menu: (provided) => ({
                  ...provided,
                  zIndex: 9999,
                  color: "rgb(75 85 99)",
                  width: "250px",
                  fontSize: "0.8rem",
                  fontWeight: "400",
                  border: "none",
                  boxShadow:
                    "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                  borderRadius: "0 0 0.5rem 0.5rem",
                }),
              }}
            />
            <input
              className="bg-transparent font-normal text-sm border-l pl-3 w-full"
              type="text"
              id="search-input"
              value={searchTerm}
              onChange={handleSearchChange}
              ref={searchInputRef}
              onFocus={() => setSearchDropdownVisible(true)}
              placeholder="Search for Products and more"
            />
            <div className="p-3 rounded-md bottom-0">
              <FiSearch className="text-gray-500" />
            </div>

            {searchDropdownVisible && (
              <div className="absolute top-full w-[540px] right-0 bg-white rounded-b-lg shadow-md mt-1 p-2 z-10">
                <ul>{renderSearchResults()}</ul>
              </div>
            )}
          </div>
          <div className="flex items-center justify-end">
            <Link
              to="/seller"
              className="hover:text-primary-600 hover:bg-primary-100 rounded-md p-2 font-semibold md:text-sm flex justify-between items-center gap-1"
            >
              <CiShop className="w-6 h-6" /> Become a Seller
            </Link>
          </div>
          <div className="flex items-center">
            <nav className="contents">
              <ul className="flex items-center justify-end gap-6">
                <li className="relative">
                  <div>
                    <button
                      type="button"
                      className={`relative flex justify-between gap-1.5 items-center cursor-pointer text-sm rounded-md p-2 font-semibold ${
                        dropdownVisible
                          ? "bg-primary-30"
                          : "hover:bg-primary-30"
                      }`}
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                      onClick={() => setDropdownVisible(!dropdownVisible)}
                      ref={buttonRef}
                    >
                      <LuUserCircle2 className="w-5 h-5" />
                      <span>Ayush</span>
                      {dropdownVisible ? (
                        <GoChevronUp className="mt-1" />
                      ) : (
                        <GoChevronDown className="mt-1" />
                      )}
                    </button>
                  </div>
                  {dropdownVisible && (
                    <div
                      className="absolute z-10 mt-2 w-44 origin-top-right rounded-b-lg bg-white p-1 shadow-md"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                      ref={dropdownRef}
                    >
                      <Link
                        to="#"
                        className="flex items-center justify-start gap-2 px-2 py-2 text-sm hover:rounded-md text-gray-600 hover:bg-primary-20 hover:text-black"
                        role="menuitem"
                        id="user-menu-item-0"
                      >
                        <LuUserCircle2 className="w-5 h-5" /> My Profile
                      </Link>
                      <Link
                        to="#"
                        className="flex items-center justify-start gap-2 px-2 py-2 text-sm hover:rounded-md text-gray-600 hover:bg-primary-20 hover:text-black"
                        role="menuitem"
                        id="user-menu-item-2"
                      >
                        <PiPackage className="w-5 h-5" />
                        Orders
                      </Link>
                      <Link
                        to="#"
                        className="flex items-center justify-start gap-2 px-2 py-2 text-sm hover:rounded-md text-gray-600 hover:bg-primary-20 hover:text-black"
                        role="menuitem"
                        id="user-menu-item-2"
                      >
                        <GoHeart className="w-5 h-5" />
                        Wishlist (12)
                      </Link>
                      <Link
                        to="#"
                        className="flex items-center justify-start gap-2 px-2 py-2 text-sm hover:rounded-md text-gray-600 hover:bg-primary-20 hover:text-black"
                        role="menuitem"
                        id="user-menu-item-2"
                      >
                        <GoTag className="w-5 h-5" />
                        Coupons
                      </Link>
                      <Link
                        to="#"
                        className="flex items-center justify-start gap-2 px-2 py-2 text-sm hover:rounded-md text-gray-600 hover:bg-primary-20 hover:text-black"
                        role="menuitem"
                        id="user-menu-item-2"
                      >
                        <MdOutlineCardGiftcard className="w-5 h-5" />
                        Gift Cards
                      </Link>
                      <Link
                        to="#"
                        className="relative flex items-center justify-start gap-2 px-2 py-2 text-sm hover:rounded-md text-gray-600 hover:bg-primary-20 hover:text-black"
                        role="menuitem"
                        id="user-menu-item-2"
                      >
                        <span className="notifications-dot"></span>
                        <IoNotificationsOutline className="w-5 h-5" />
                        Notifications (5)
                      </Link>
                      <Link
                        to="#"
                        className="flex items-center justify-start gap-2 px-2 py-2 text-sm hover:rounded-md text-gray-600 hover:bg-primary-20 hover:text-red-700"
                        role="menuitem"
                        id="user-menu-item-2"
                      >
                        <IoLogOutOutline className="w-5 h-5" />
                        Sign out
                      </Link>
                    </div>
                  )}
                </li>
                <li className="relative">
                  <span className="cart-badge">10</span>
                  <div className="flex justify-between items-center gap-2 cursor-pointer md:text-sm p-2 font-semibold">
                    <Link to="">
                      <FiShoppingCart className="w-5 h-5" />
                    </Link>
                    <span>Cart</span>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <Navbar />
    </>
  );
};

export default Header;
