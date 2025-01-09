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
import { Link } from "react-router-dom";
import "./ProductDetails.css";
import MarketingPriceCard from "../../../MarketingCard/MarketingPriceCard";
const ProductDetails = ({ data }) => {
  const [visibleReviews, setVisibleReviews] = useState(3); // Initially show 3 reviews
  const [click, setClick] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const handleViewMore = () => {
    setVisibleReviews((prev) => prev + 5); // Show 5 more reviews on each click
  };

  const handleMessageSubmit = () => {};

  return (
    <>
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-5 productDetails-l-wrapper">
          {/* Image Swiper */}
          <div className="bg-white p-6 rounded-lg shadow-sm sticky top-16 z-10">
            <div className="productDetails-img-wrapper mb-[13px]">
              <div className="productDetails-img-wrap mx-auto relative">
                <Swiper
                  loop={true}
                  spaceBetween={10}
                  navigation={true}
                  thumbs={{ swiper: thumbsSwiper }}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="productDetails-img mb-[10px]"
                >
                  {data.image_Url.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={image.url}
                        className="productDetails-img"
                        alt={`Product image ${index + 1}`}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <Swiper
                  onSwiper={setThumbsSwiper}
                  loop={true}
                  spaceBetween={3}
                  slidesPerView={7}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="productDetails-thumbs"
                >
                  {data.image_Url.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img src={image.url} alt={`Thumbnail ${index + 1}`} />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="ml-3 mr-3">
                  <div className="productDetails-icon-wrapper bg-primary-20 hover:bg-primary-50 cursor-pointer border border-dashed hover:border-solid border-primary-200 rounded-full p-2">
                    {click ? (
                      <GoHeartFill
                        className="productDetails-icon cursor-pointer"
                        onClick={() => setClick(!click)}
                        color={click ? "#dc2626" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <GoHeart
                        className="productDetails-icon cursor-pointer"
                        onClick={() => setClick(!click)}
                        color={click ? "#dc2626" : "#333"}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Add to Cart and Buy Now Buttons */}
            <div className="flex items-center justify-between gap-1 mt-3">
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white rounded-lg w-full px-1.5 py-2.5 flex items-center justify-center gap-1 text-sm me-1 outline-none focus:outline-none ease-in-out duration-100 font-semibold"
              >
                Add to cart
                <FiShoppingCart className="text-lg" />
              </button>
              <button
                type="submit"
                className="w-full border border-solid border-primary-600 text-primary-600 rounded-lg px-1.5 py-2.5 flex items-center justify-center gap-1 bg-transparent hover:bg-primary-600 hover:text-white outline-none focus:outline-none text-sm ease-in-out duration-100 font-semibold"
              >
                Buy Now
                <FaAnglesRight className="text-[14px]" />
              </button>
            </div>
            {/* TODO: need to add send message button */}
          </div>
        </div>

        <div className="col-span-7 productDetails-r-wrapper">
          <div className="w-full">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-3">
              {/* Product Info */}
              <div className="p-2 border border-dashed border-primary-200 rounded-lg mb-2">
                <h1
                  className="text-lg font-semibold text-gray-900 mb-2 truncate-text"
                  title={data.name}
                >
                  {data.name}
                </h1>
                <div className="flex items-center justify-start gap-2 mb-2">
                  <h4 className="text-[22px] font-semibold">
                    <span className="rupee-icon mr-1">₹</span>
                    {data.discount_price}
                  </h4>
                  <h3 className="text-[14px] line-through text-[#878787] font-semibold">
                    ({data.price ? "₹" + data.price : null})
                  </h3>
                  <div className="productDetails-discount-wrap">
                    <h3 className="productDetails-discount-text">
                      {data.discount_percent} off
                    </h3>
                    <div className="info-wrap cursor-pointer text-[20px] text-[#878787]">
                      <HiOutlineInformationCircle />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-start gap-2 mb-3">
                  <div className="productDetails-rating flex items-center justify-start gap-1">
                    <FaStar />
                    <p className="font-semibold">{data.ratings}</p>
                  </div>
                  <p className="text-[#878787] text-xs font-normal">
                    105098 Ratings, 21052 Reviews
                  </p>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <span className="bg-[#f8f8ff] text-[#616173] text-xs font-semibold me-2 px-[10px] py-[4px] rounded-full">
                    Free Delivery
                  </span>
                </div>
              </div>
              {/* Select Size */}
              <div className="p-2 border border-dashed border-primary-200 rounded-lg mb-2">
                <div className="flex justify-between items-center">
                  <h1 className="text-lg font-semibold mb-1 truncate-text">
                    Select Size
                  </h1>
                  <div className="info-wrap cursor-pointer text-[20px] text-[#878787]">
                    <HiOutlineInformationCircle />
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="bg-primary-100 text-primary-500 text-sm font-semibold me-2 px-3 py-1.5 rounded-full">
                    Free Size
                  </span>
                </div>
              </div>
              {/* Product Description */}
              <div className="p-2 border border-dashed border-primary-200 rounded-lg mb-2">
                <div className="desc-wrap mb-4">
                  <h1 className="text-lg font-semibold mb-3">
                    Product Description
                  </h1>
                  <p className="text-[14px] leading-normal">
                    {data.description}
                  </p>
                </div>
              </div>
              {/* Seller Description */}
              <div className="p-2 border border-dashed border-primary-200 rounded-lg mb-2">
                <div className="seller-wrap">
                  <h1 className="text-lg font-semibold mb-3">Sold By</h1>
                  <div className="flex items-center">
                    <div className="w-full flex items-center justify-start">
                      <div className="flex items-center justify-between gap-5">
                        <div className="flex items-center justify-start gap-3">
                          <img
                            src={data.shop.shop_avatar.url}
                            alt="data.shop.name"
                            className="w-[55px] h-[55px] object-cover rounded-full"
                          />
                          <div className="flex flex-col">
                            <h3 className="text-sm font-semibold mb-1">
                              {data.shop.name}
                            </h3>
                            <div className="flex items-center justify-start gap-2 mb-3">
                              <div className="flex items-center justify-start gap-1 bg-primary-600 py-1 px-2 rounded-full text-xs text-white">
                                <FaStar />
                                <p className="font-semibold">
                                  {data.shop.ratings}
                                </p>
                              </div>
                              <p className="text-[#878787] text-xs font-semibold">
                                105098 Ratings
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Link
                      to={`/shop/${data.shop.id}`}
                      className="w-48 border border-solid border-primary-200 text-primary-400 rounded-lg py-2 bg-transparent hover:bg-primary-600 hover:text-white outline-none focus:outline-none text-sm ease-in-out duration-100 font-semibold text-center"
                    >
                      View Shop
                    </Link>
                  </div>
                </div>
              </div>
              {/* Rating */}
              <div className="productDetails-ratings-wrapper border border-dashed border-primary-200 rounded-lg">
                <div className="productDetails-ratings-wrapper-top p-2 mb-3">
                  <div className="rating-wrap">
                    <h1 className="text-lg font-semibold">Ratings & Reviews</h1>
                  </div>
                </div>
                <div className="productDetails-ratings-wrapper-bottom">
                  <div className="ratings-top py-0 px-2 border-b border-dashed border-primary-200">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col justify-start">
                        <div className="flex items-center mb-2">
                          <FaStar className="w-4 h-4 text-yellow-400 me-1" />
                          <FaStar className="w-4 h-4 text-yellow-400 me-1" />
                          <FaStar className="w-4 h-4 text-yellow-400 me-1" />
                          <FaStar className="w-4 h-4 text-yellow-400 me-1" />
                          <FaStar className="w-4 h-4 text-yellow-400 me-1" />
                          <p className="ms-1 text-sm font-semibold text-gray-500">
                            4.95
                          </p>
                          <p className="ms-1 text-sm font-semibold text-gray-500">
                            out of
                          </p>
                          <p className="ms-1 text-sm font-semibold text-gray-500">
                            5
                          </p>
                        </div>
                        <p className="text-xs font-semibold text-[#878787]">
                          72345 global ratings & 21445 Reviews
                        </p>
                      </div>
                      <button
                        type="submit"
                        className="border border-solid border-primary-200 text-primary-400 rounded-md px-6 py-2 bg-transparent hover:bg-primary-600 hover:text-white outline-none focus:outline-none text-xs ease-in-out duration-100 font-semibold"
                      >
                        Rate Product
                      </button>
                    </div>
                    <div className="flex items-center mt-4">
                      <div className="text-sm font-semibold text-gray-900 flex items-center justify-start gap-1">
                        <span>5</span> <FaStar />
                      </div>
                      <div className="w-2/4 h-3 mx-4 bg-gray-200 rounded">
                        <div className="h-3 bg-yellow-400 rounded w-[70%]"></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-500">
                        70%
                      </span>
                    </div>
                    <div className="flex items-center mt-2">
                      <div className="text-sm font-semibold text-gray-900 flex items-center justify-start gap-1">
                        <span>4</span> <FaStar />
                      </div>
                      <div className="w-2/4 h-3 mx-4 bg-gray-200 rounded">
                        <div className="h-3 bg-yellow-400 rounded w-[17%]"></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-500">
                        17%
                      </span>
                    </div>
                    <div className="flex items-center mt-2">
                      <div className="text-sm font-semibold text-gray-900 flex items-center justify-start gap-1">
                        <span>3</span> <FaStar />
                      </div>
                      <div className="w-2/4 h-3 mx-4 bg-gray-200 rounded">
                        <div className="h-3 bg-yellow-400 rounded w-[8%]"></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-500">
                        8%
                      </span>
                    </div>
                    <div className="flex items-center mt-2">
                      <div className="text-sm font-semibold text-gray-900 flex items-center justify-start gap-1">
                        <span>2</span> <FaStar />
                      </div>
                      <div className="w-2/4 h-3 mx-4 bg-gray-200 rounded">
                        <div className="h-3 bg-yellow-400 rounded w-[4%]"></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-500">
                        4%
                      </span>
                    </div>
                    <div className="flex items-center mt-2 mb-4">
                      <div className="text-sm font-semibold text-gray-900 flex items-center justify-start gap-1">
                        <span>1</span> <FaStar />
                      </div>
                      <div className="w-2/4 h-3 mx-[18px] bg-gray-200 rounded">
                        <div className="h-3 bg-yellow-400 rounded w-[10%]"></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-500">
                        1%
                      </span>
                    </div>
                  </div>
                  {data.reviews.length > 0 ? (
                    <>
                      {data.reviews
                        .slice(0, visibleReviews)
                        .map((review, index) => (
                          <div
                            key={index}
                            className="ratings-bottom px-2 py-4 border-b last:border-b-0 border-dashed border-primary-200"
                          >
                            <div className="flex items-start gap-3">
                              <div className="flex items-center justify-start gap-1 bg-primary-600 py-[2px] px-2 rounded-full text-xs text-white">
                                <FaStar className="text-[10px]" />
                                <p className="text-[10px] font-semibold">
                                  {review.rating}
                                </p>
                              </div>
                              <div className="rating-title-wrap">
                                <h5 className="text-sm font-semibold text-gray-900">
                                  {review.comment_title}
                                </h5>
                              </div>
                            </div>
                            <div className="ratings-comment-wrap mt-2">
                              <h5 className="text-sm font-normal text-gray-900">
                                {review.comment}
                              </h5>
                              <div className="ratings-comment-user-wrap mt-1 flex justify-start gap-2">
                                <p className="text-xs font-semibold text-gray-500 ">
                                  {review.user.username}
                                </p>
                                <p className="text-xs font-semibold text-gray-500 ">
                                  {new Date(
                                    review.review_date
                                  ).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      {visibleReviews < data.reviews.length && (
                        <div className="p-2 flex justify-center">
                          <button
                            onClick={handleViewMore}
                            className="w-full py-2 px-3 transition-all bg-primary-50 text-primary-500 text-sm font-semibold rounded-lg hover:bg-primary-100 hover:text-primary-600"
                          >
                            View more
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="p-2">
                      <p className="text-sm font-semibold text-center block w-full p-2 text-primary-500 bg-primary-50 rounded-lg">
                        No reviews yet
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {/* Q & Ans section
              <div className="p-2 border border-dashed border-primary-200 rounded-lg mt-2">
                <div className="seller-wrap">
                  <h1 className="text-lg font-semibold mb-3">
                    Questions and Answers
                  </h1>
                </div>
              </div> */}
            </div>
            <MarketingPriceCard />
          </div>
        </div>
      </div>
      {/* TODO: need to add related products section here */}
    </>
  );
};

export default ProductDetails;
