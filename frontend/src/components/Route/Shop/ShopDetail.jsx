import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const ShopDetail = ({ data }) => {
  const [visibleReviews, setVisibleReviews] = useState(3); // Initially show 3 reviews
  const { shop } = data;

  const handleViewMore = () => {
    setVisibleReviews((prev) => prev + 5); // Show 5 more reviews on each click
  };

  return (
    // TODO: need to change it in the future
    <>
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-3">
          <div className="bg-white shadow-xs rounded-lg sticky top-16 z-10 mb-2">
            <div className="shopDetails-info-wrapper">
              <img
                src="/assets/img/shop/shop-cover.png"
                className="rounded-tl-lg rounded-tr-lg h-32 w-full object-cover"
              />
              <div className="flex items-center space-x-3 p-3">
                <img
                  src={shop.shop_avatar.url}
                  alt={`${shop.name} Avatar`}
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary-100"
                />
                <div>
                  <h1 className="text-sm font-semibold text-gray-900 uppercase">
                    {shop.name}
                  </h1>
                  <div className="text-sm text-gray-500 mt-1">
                    <div className="flex items-center justify-start gap-2 mb-3">
                      <div className="flex items-center justify-start gap-1 bg-primary-600 py-[2px] px-2 rounded-full text-[10px] text-white">
                        <FaStar className="text-[10px]" />
                        <p className="text-[10px] font-semibold">
                          {shop.ratings || "N/A"}
                        </p>
                      </div>
                      <p className="text-[#878787] text-[10px] font-normal">
                        105098 Ratings
                      </p>
                      <div className="rating-separator"></div>
                      <p className="text-gray-900 text-[10px] font-semibold">
                        <span className="text-gray-900 text-sm">48</span>
                        <span className="text-[#878787]"> Products</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-9">
          <div className="bg-white shadow-xs rounded-lg">
            <div className="shopDetails-wrapper p-6">
              {/* Rating */}
              <div className="shopDetails-review border border-dashed border-primary-200 rounded-lg">
                <div className="shopDetails-review-wrapper-top p-2 mb-3">
                  <div className="rating-wrap">
                    <h1 className="text-lg font-semibold">Ratings & Reviews</h1>
                  </div>
                </div>
                <div className="shopDetails-review-wrapper-bottom">
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
                            4.9
                          </p>
                          <p className="ms-1 text-sm font-semibold text-gray-500">
                            out of
                          </p>
                          <p className="ms-1 text-sm font-semibold text-gray-500">
                            5
                          </p>
                        </div>
                        <p className="text-[10px] font-semibold text-[#878787]">
                          72345 global ratings & 21445 Reviews
                        </p>
                      </div>
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
                  {shop.reviews && shop.reviews.length > 0 ? (
                    <>
                      {shop.reviews
                        .slice(0, visibleReviews)
                        .map((review, index) => (
                          <div
                            key={index}
                            className="ratings-bottom px-2 py-4 border-b last:border-b-0 border-dashed border-primary-200"
                          >
                            <div className="flex items-start gap-3">
                              <div className="flex items-center justify-start gap-1 bg-primary-600 py-[2px] px-2 rounded-full text-[10px] text-white">
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
                                <p className="text-[10px] font-semibold text-gray-500 ">
                                  {review.user.username}
                                </p>
                                <p className="text-[10px] font-semibold text-gray-500 ">
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
                      {visibleReviews < shop.reviews.length && (
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopDetail;
