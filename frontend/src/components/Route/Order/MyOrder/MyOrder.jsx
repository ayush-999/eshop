import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../../Loader/LoadingSpinner";
import { FiSearch } from "react-icons/fi";
import { IoFilter } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { Tooltip } from "react-tooltip";
import { ordersData } from "../../../../static/data"; // Import ordersData
import { formatDate } from "../../../../utils/helper";
import OrderStatus from "../../../Status/OrderStatus";
import "./MyOrder.css";

const MyOrder = () => {
  const { user, dataLoading } = useSelector((state) => state.user) || {};
  return (
    <>
      {dataLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="order-info-wrapper">
          <div className="grid grid-cols-12">
            <div className="col-span-12">
              <div className="flex justify-start items-center mb-5">
                <h1 className="text-lg font-semibold">My Orders</h1>
              </div>
              {ordersData.length > 0 ? (
                <>
                  {/* Order search and filter */}
                  <div className="order-search-wrapper mb-4 relative">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Search your orders here"
                        className="flex-1 px-3 py-2 bg-primary-10 border border-dashed border-primary-200 rounded-lg font-normal text-sm placeholder:text-gray-400"
                      />
                      <button className="p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-all ease-in-out">
                        <FiSearch />
                      </button>
                      <div className="order-filter-wrapper">
                        <button className="p-2 bg-transparent text-gray-900 rounded-full hover:bg-primary-50 hover:text-primary-600 transition-all ease-in-out order-filter-btn">
                          <IoFilter />
                        </button>
                        <div className="order-filter-wrap z-10">
                          <div className="order-filter-dropdown">
                            <h3 className="text-sm font-semibold mb-2 ml-2">
                              Order Status
                            </h3>
                            <div className="flex flex-col gap-1">
                              <label className="flex items-center gap-2 text-[13px] font-normal py-1 px-2 transition-all hover:rounded-[4px] hover:bg-primary-50 hover:text-gray-900 text-gray-600">
                                <input type="checkbox" className="checkbox" />
                                On the way
                              </label>
                              <label className="flex items-center gap-2 text-[13px] font-normal py-1 px-2 transition-all hover:rounded-[4px] hover:bg-primary-50 hover:text-gray-900 text-gray-600">
                                <input type="checkbox" className="checkbox" />
                                Delivered
                              </label>
                              <label className="flex items-center gap-2 text-[13px] font-normal py-1 px-2 transition-all hover:rounded-[4px] hover:bg-primary-50 hover:text-gray-900 text-gray-600">
                                <input type="checkbox" className="checkbox" />
                                Cancelled
                              </label>
                              <label className="flex items-center gap-2 text-[13px] font-normal py-1 px-2 transition-all hover:rounded-[4px] hover:bg-primary-50 hover:text-gray-900 text-gray-600">
                                <input type="checkbox" className="checkbox" />
                                Returned
                              </label>
                              <label className="flex items-center gap-2 text-[13px] font-normal py-1 px-2 transition-all hover:rounded-[4px] hover:bg-primary-50 hover:text-gray-900 text-gray-600">
                                <input type="checkbox" className="checkbox" />
                                Refund Inprogress
                              </label>
                              <label className="flex items-center gap-2 text-[13px] font-normal py-1 px-2 transition-all hover:rounded-[4px] hover:bg-primary-50 hover:text-gray-900 text-gray-600">
                                <input type="checkbox" className="checkbox" />
                                Refund Failed
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Order details */}
                  <div className="order-item-rapper rounded-lg border border-dashed border-primary-200">
                    {ordersData.map((order) => (
                      <div
                        key={order.order_id}
                        className="order-view-wrap cursor-pointer border-b border-dashed last:border-b-0 border-primary-200"
                      >
                        {/* <Link to={`/account/order_details?order_id=${order.order_id}`}> */}
                        <Link to={`/order_details/${order.order_id}`}>
                          <div className="order-view-item p-5">
                            <div className="order-item flex justify-between mb-4">
                              <div className="w-8/12 order-details-wrap flex gap-2">
                                <div className="order-details-img">
                                  <img
                                    src={order.product.image_Url[0].url}
                                    className="w-16 h-16 object-contain"
                                    alt={order.product.name}
                                  />
                                </div>
                                <div className="order-details-text">
                                  <h3 className="text-sm font-normal">
                                    {order.product.name}
                                  </h3>
                                  <p className="text-[10px] text-[#878787]">
                                    Color: {order.product.shop.name} | Size:
                                    {order.product.category || "N/A"}
                                  </p>
                                  <p className="text-[10px] text-gray-900">
                                    ₹ {order.product.price.toLocaleString()}
                                  </p>
                                </div>
                              </div>
                              <div className="w-4/12 order-status-wrapper flex flex-col gap-4">
                                <div className="order-status flex flex-col gap-1">
                                  {order.status === "delivered" ? (
                                    <div className="order-status-delivered">
                                      <div className="flex items-center gap-2 mb-1">
                                        <div className="w-3 h-3 rounded-full bg-green-600"></div>
                                        <h3 className="text-sm font-semibold text-gray-900">
                                          Order delivered on{" "}
                                          {formatDate(order.deliveredDate)}
                                        </h3>
                                      </div>
                                      <p className="text-[10px] text-gray-800">
                                        Your item has been delivered
                                      </p>
                                    </div>
                                  ) : order.status === "cancelled" ? (
                                    <div className="order-status-return">
                                      <div className="flex items-center gap-2 mb-1">
                                        <div className="w-3 h-3 rounded-full bg-red-600"></div>
                                        <h3 className="text-sm font-semibold text-gray-900">
                                          Order cancelled on
                                          {formatDate(order.refundDate)}
                                        </h3>
                                      </div>
                                      <p className="text-[10px] text-gray-800">
                                        You requested a cancellation because you
                                        changed your mind about this product.
                                      </p>
                                    </div>
                                  ) : order.status === "out_for_delivery" ? (
                                    <div className="order-status-onTheWay">
                                      <div className="flex items-center gap-2 mb-1">
                                        <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                                        <h3 className="text-sm font-semibold text-gray-900">
                                          Your order is on the way
                                        </h3>
                                      </div>
                                      <p className="text-[10px] text-gray-800">
                                        <span className="font-semibold me-1">
                                          Estimated delivery :
                                        </span>
                                        {formatDate(order.outForDeliveryDate)}
                                      </p>
                                    </div>
                                  ) : order.status === "returned" ? (
                                    <div className="order-status-returned">
                                      <div className="flex items-center gap-2 mb-1">
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <h3 className="text-sm font-semibold text-gray-900">
                                          Order returned on{" "}
                                          {formatDate(order.returnDate)}
                                        </h3>
                                      </div>
                                      <p className="text-[10px] text-gray-800">
                                        Your item was successfully returned.
                                      </p>
                                    </div>
                                  ) : order.status === "refund_in_progress" ? (
                                    <div className="order-status-refund_in_progress">
                                      <div className="flex items-center gap-2 mb-1">
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <h3 className="text-sm font-semibold text-gray-900">
                                          Order refund in progress
                                        </h3>
                                      </div>
                                      <p className="text-[10px] text-gray-800">
                                        Your refund is being processed.
                                      </p>
                                    </div>
                                  ) : (
                                    <div className="order-status-refund-failed">
                                      <div className="flex items-center gap-2 mb-1">
                                        <div className="w-3 h-3 rounded-full bg-red-600"></div>
                                        <h3 className="text-sm font-semibold text-gray-900">
                                          Order refund failed
                                        </h3>
                                      </div>
                                      <p className="text-[10px] text-gray-800">
                                        Your refund request has failed.
                                      </p>
                                    </div>
                                  )}
                                </div>
                                {order.status === "delivered" && (
                                  <button className="border border-solid border-primary-200 text-primary-400 rounded-md px-6 py-2 bg-transparent hover:bg-primary-600 hover:text-white outline-none focus:outline-none text-[10px] ease-in-out duration-100 font-semibold">
                                    Rate & Review Product
                                  </button>
                                )}
                                {order.status === "out_for_delivery" && (
                                  <div className="progress-bar-wrapper mt-3 mb-3">
                                    <div className="bg-gray-200 h-1 flex items-center justify-between">
                                      <div className="w-1/3 bg-green-600 h-1 flex items-center">
                                        <div
                                          className="bg-green-600 h-6 w-6 rounded-full shadow flex items-center justify-center"
                                          data-tooltip-id="progress-bar-item"
                                          data-tooltip-content={`Order Confirmed : ${formatDate(
                                            order.confirmedDate
                                          )}`}
                                          data-tooltip-variant="dark"
                                        >
                                          <FaCheck className="w-3 h-3 text-white" />
                                        </div>
                                      </div>
                                      <div className="w-1/3 flex justify-between bg-green-600 h-1 items-center">
                                        <div
                                          className="bg-green-600 h-6 w-6 rounded-full shadow flex items-center justify-center -ml-2"
                                          data-tooltip-id="progress-bar-item"
                                          data-tooltip-content={`Shipped : ${formatDate(
                                            order.shippedDate
                                          )}`}
                                          data-tooltip-variant="dark"
                                        >
                                          <FaCheck className="w-3 h-3 text-white" />
                                        </div>
                                        <div
                                          className="bg-white h-6 w-6 rounded-full shadow flex items-center justify-center -mr-3"
                                          data-tooltip-id="progress-bar-item"
                                          data-tooltip-content={`Out for Delivery : ${formatDate(
                                            order.outForDeliveryDate
                                          )}`}
                                          data-tooltip-variant="dark"
                                        >
                                          <div className="h-3 w-3 bg-green-600 rounded-full" />
                                        </div>
                                      </div>
                                      <div className="w-1/3 flex justify-end">
                                        <div
                                          className="bg-white h-6 w-6 rounded-full shadow"
                                          data-tooltip-id="progress-bar-item"
                                          data-tooltip-content="Delivered"
                                          data-tooltip-variant="dark"
                                        />
                                      </div>
                                    </div>
                                    <Tooltip
                                      id="progress-bar-item"
                                      style={{
                                        borderRadius: "5px",
                                        boxShadow:
                                          "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                                      }}
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                            <OrderStatus status={order.status} />
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="rounded-lg border border-dashed border-primary-200 p-2 no-order">
                  <p className="text-sm font-semibold text-center block w-full p-2 text-primary-500 bg-primary-50 rounded-lg">
                    No order found
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyOrder;
