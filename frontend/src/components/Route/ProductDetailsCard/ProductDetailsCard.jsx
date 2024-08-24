/* eslint-disable react/prop-types */
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { FaStar } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { FaAnglesRight } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "./productDetailsCard.css";
import { Link } from "react-router-dom";

const ProductDetailsCard = ({ setOpen, data }) => {
  const [click, setClick] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isTruncated, setIsTruncated] = useState(true);

  const handleMessageSubmit = () => {};

  const toggleTruncation = () => {
    setIsTruncated(!isTruncated);
  };

  const truncateText = (text, maxWords = 100, maxChars = 300) => {
    const wordsArray = text.split(" ");
    const truncatedByWords =
      wordsArray.length > maxWords
        ? wordsArray.slice(0, maxWords).join(" ") + "... "
        : text;

    const truncatedByChars =
      truncatedByWords.length > maxChars
        ? truncatedByWords.slice(0, maxChars) + "... "
        : truncatedByWords;

    return truncatedByChars;
  };

  return (
    <div className="pcarddetails-popup">
      {data ? (
        <div className="pcarddetails-overlay">
          <div className="w-[90%] 800px:w-[60%] h-[90vh] 800px:h-[75vh] bg-white rounded-lg shadow-sm relative p-6 overflow-hidden">
            <RxCross1 className="close-icon" onClick={() => setOpen(false)} />
            <div className="block w-full">
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-5 pcarddetails-r-wrapper">
                  {/* Image Swiper */}
                  <div className="pcarddetails-img-wrapper mb-4">
                    <div className="pcarddetails-img-wrap mx-auto">
                      <Swiper
                        loop={true}
                        spaceBetween={10}
                        navigation={true}
                        thumbs={{ swiper: thumbsSwiper }}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="pcarddetails-img mb-[2px]"
                      >
                        {data.image_Url.map((image, index) => (
                          <SwiperSlide key={index}>
                            <img
                              src={image.url}
                              className="pcarddetails-img"
                              alt={`Product image ${index + 1}`}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                      <Swiper
                        onSwiper={setThumbsSwiper}
                        loop={true}
                        spaceBetween={3}
                        slidesPerView={5}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="pcarddetails-thumbs"
                      >
                        {data.image_Url.map((image, index) => (
                          <SwiperSlide key={index}>
                            <img
                              src={image.url}
                              alt={`Thumbnail ${index + 1}`}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </div>
                  {/* Shop Info and Wishlist Button */}
                  <div className="flex items-center">
                    <p className="w-full flex items-center justify-start">
                      <Link to={`/shop/preview/${data.shop._id}`}>
                        <div className="flex items-center gap-2">
                          <img
                            src={data.shop.shop_avatar.url}
                            alt="data.shop.name"
                            className="w-[20px] h-[20px] rounded-full"
                          />
                          <div className="flex items-center justify-start gap-2">
                            <h3 className="text-sm font-medium">
                              {data.shop.name}
                            </h3>
                            <div className="rating-separator"></div>
                            <div className="text-[13px] flex items-center justify-start gap-1">
                              <FaStar className="text-primary-500" />
                              <p className="font-bold">{data.shop.ratings}</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </p>
                  </div>
                  {/* Message and Wishlist Buttons */}
                  <div className="flex items-center justify-between gap-1 mt-3">
                    <button
                      type="submit"
                      className="bg-primary-600 hover:bg-primary-700 text-white rounded-lg w-full px-1.5 py-2.5 flex items-center justify-center gap-[5px] text-sm me-1 outline-none focus:outline-none ease-in-out duration-100 font-medium"
                      onClick={handleMessageSubmit}
                    >
                      Send Message
                      <AiOutlineMessage className="text-[18px]" />
                    </button>
                    <div className="ml-3 mr-3">
                      {click ? (
                        <GoHeartFill
                          className="pcarddetails-icon cursor-pointer"
                          onClick={() => setClick(!click)}
                          color={click ? "#dc2626" : "#333"}
                          title="Remove from wishlist"
                        />
                      ) : (
                        <GoHeart
                          className="pcarddetails-icon cursor-pointer"
                          onClick={() => setClick(!click)}
                          color={click ? "#dc2626" : "#333"}
                          title="Add to wishlist"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-span-7 pcarddetails-l-wrapper">
                  <div className="w-full">
                    {/* Product Info */}
                    <div className="p-2 border border-gray-200 rounded-lg mb-2">
                      <h1
                        className="text-[16px] font-medium text-[#878787] mb-2 truncate-text"
                        title={data.name}
                      >
                        {data.name}
                      </h1>
                      <div className="flex items-center justify-start gap-2 mb-2">
                        <h4 className="text-[22px] font-medium">
                          <span className="rupee-icon mr-1">₹</span>
                          {data.discount_price}
                        </h4>
                        <h3 className="text-[14px] line-through text-[#878787] font-medium">
                          ({data.price ? "₹" + data.price : null})
                        </h3>
                        <div className="pcarddetails-discount-wrap">
                          <h3 className="pcarddetails-discount-text">
                            21% off
                          </h3>
                          <div className="info-wrap cursor-pointer text-[20px] text-[#878787]">
                            <HiOutlineInformationCircle />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-start gap-2 mb-3">
                        <div className="pcarddetails-rating flex items-center justify-start gap-1">
                          <FaStar />
                          <p className="font-medium">{data.shop.ratings}</p>
                        </div>
                        <p className="text-[#878787] text-xs font-normal">
                          105098 Ratings, 21052 Reviews
                        </p>
                      </div>
                      <div className="flex items-center justify-start gap-2">
                      <span className="bg-[#f8f8ff] text-[#616173] text-xs font-medium me-2 px-[10px] py-[4px] rounded-full">
                          Free Delivery
                        </span>
                      </div>
                    </div>
                    {/* Select Size */}
                    <div className="p-2 border border-gray-200 rounded-lg mb-2">
                      <div className="flex justify-between items-center">
                        <h1 className="text-[15px] font-medium mb-1 truncate-text">
                          Select Size
                        </h1>
                        <div className="info-wrap cursor-pointer text-[20px] text-[#878787]">
                          <HiOutlineInformationCircle />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <span className="bg-primary-100 text-primary-500 text-sm font-medium me-2 px-3 py-1.5 rounded-full">
                          Free Size
                        </span>
                      </div>
                    </div>
                    {/* Product Description */}
                    <div className="p-2 border border-gray-200 rounded-lg">
                      <div className="desc-wrap mb-4">
                        <h1 className="text-[16px] font-medium mb-1">
                          Product Details
                        </h1>
                        <p className="text-[15px] leading-normal">
                          {isTruncated
                            ? truncateText(data.description)
                            : data.description}
                          {isTruncated && (
                            <Link
                              to={`/shop/preview/${data.shop._id}`}
                              onClick={toggleTruncation}
                              className="text-blue-500 cursor-pointer"
                            >
                              see more
                            </Link>
                          )}
                        </p>
                      </div>
                    </div>
                    {/* Add to Cart and Buy Now Buttons */}
                    <div className="flex items-center mt-3 justify-between">
                      <button
                        type="submit"
                        className="bg-primary-600 hover:bg-primary-700 text-white rounded-lg w-full px-1.5 py-2.5 flex items-center justify-center gap-1 text-sm me-1 outline-none focus:outline-none ease-in-out duration-100 font-medium"
                      >
                        Add to cart
                        <FiShoppingCart className="text-[16px]" />
                      </button>
                      <button
                        type="submit"
                        className="w-full border border-solid border-primary-600 text-primary-600 rounded-lg px-1.5 py-2.5 flex items-center justify-center gap-1 bg-transparent hover:bg-primary-600 hover:text-white outline-none focus:outline-none text-sm ease-in-out duration-100 font-medium"
                      >
                        Buy Now
                        <FaAnglesRight className="text-[14px]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCard;
