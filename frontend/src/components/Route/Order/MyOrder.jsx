import { useSelector } from "react-redux";
import LoadingSpinner from "../../Loader/LoadingSpinner";
import { FiSearch } from "react-icons/fi";
import { IoFilter, IoCloseCircle } from "react-icons/io5";
import { FaCheck, FaCircleCheck } from "react-icons/fa6";
import { TbProgressCheck } from "react-icons/tb";
import { Tooltip } from "react-tooltip";
import "./MyOrder.css";

const MyOrder = () => {
  const { user, dataLoading } = useSelector((state) => state.user) || {};

  const orders = [
    {
      id: 1,
      name: "Damensch Solid Men Round Neck Black T-Shirt",
      image:
        "https://rukminim2.flixcart.com/image/200/200/xif0q/t-shirt/h/d/a/m-ts1102-jetblk-damensch-original-imagqy7e5ezvvbbh.jpeg?q=90",
      price: 722,
      color: "Black",
      size: "XL",
      status: "Delivered",
      deliveredDate: "Oct 09",
    },
    {
      id: 2,
      name: "SanDisk Extreme Portable SSD",
      image:
        "https://rukminim2.flixcart.com/image/200/200/klv7ekw0/external-hard-drive/ssd/x/u/4/sdssde61-500g-g25-sandisk-original-imagywhgg8zcjjvv.jpeg?q=90",
      price: 9399,
      color: "Black, Red",
      status: "Refund Completed",
      refundDate: "Oct 03, 2022",
    },
    {
      id: 3,
      name: "Men Tapered Fit Low Rise Blue Jeans",
      image:
        "https://rukminim2.flixcart.com/image/200/200/xif0q/jean/n/s/j/-original-imah2mvtbcjuczmv.jpeg?q=90",
      price: 1300,
      color: "Blue",
      size: "34",
      status: "On the way",
      estimatedDelivery: "Oct 18, 2023",
    },
    {
      id: 4,
      name: "Puma Unisex Running Shoes",
      image:
        "https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/r/h/x/-original-imah4syhzcztjuzm.jpeg?q=70",
      price: 2499,
      color: "Black, Red",
      size: "9",
      status: "Returned",
      returnDate: "Nov 15, 2023",
    },
    {
      id: 5,
      name: "Refund Inprogress Item",
      image:
        "https://rukminim2.flixcart.com/image/200/200/xif0q/backpack/q/j/j/-original-imagh3wa6fzrzkaj.jpeg?q=90",
      price: 1500,
      color: "Black",
      size: "34L",
      status: "Refund Inprogress",
      refundDate: "Nov 20, 2023",
    },
    {
      id: 6,
      name: "Refund Failed Item",
      image:
        "https://rukminim2.flixcart.com/image/200/200/xif0q/backpack/q/j/j/-original-imagh3wa6fzrzkaj.jpeg?q=90",
      price: 2000,
      color: "Blue",
      size: "",
      status: "Refund Failed",
      refundDate: "Nov 22, 2023",
    },
  ];

  return (
    <>
      {dataLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="order-info-wrapper">
          <div className="grid grid-cols-12">
            <div className="col-span-12">
              <div className="flex justify-start items-center mb-5">
                <h1 className="text-lg font-medium">My Orders</h1>
              </div>
              {orders.length > 0 ? (
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
                            <h3 className="text-sm font-medium mb-2 ml-2">
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
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="order-view-wrap cursor-pointer border-b border-dashed last:border-b-0 border-primary-200"
                      >
                        <div className="order-view-item p-5">
                          <div className="order-item flex justify-between mb-4">
                            <div className="w-8/12 order-details-wrap flex gap-2">
                              <div className="order-details-img">
                                <img
                                  src={order.image}
                                  className="w-16 h-16 object-contain"
                                />
                              </div>
                              <div className="order-details-text">
                                <h3 className="text-sm font-normal">
                                  {order.name}
                                </h3>
                                <p className="text-xs text-[#878787]">
                                  Color: {order.color} | Size:{" "}
                                  {order.size || "N/A"}
                                </p>
                                <p className="text-xs text-gray-900">
                                  ₹ {order.price.toLocaleString()}
                                </p>
                              </div>
                            </div>
                            <div className="w-4/12 order-status-wrapper flex flex-col gap-4">
                              <div className="order-status flex flex-col gap-1">
                                {order.status === "Delivered" ? (
                                  <div className="order-status-delivered">
                                    <div className="flex items-center gap-2 mb-1">
                                      <div className="w-3 h-3 rounded-full bg-green-600"></div>
                                      <h3 className="text-sm font-medium text-gray-900">
                                        Delivered on {order.deliveredDate}
                                      </h3>
                                    </div>
                                    <p className="text-xs text-gray-800">
                                      Your item has been delivered
                                    </p>
                                  </div>
                                ) : order.status === "Refund Completed" ? (
                                  <div className="order-status-return">
                                    <div className="flex items-center gap-2 mb-1">
                                      <div className="w-3 h-3 rounded-full bg-red-600"></div>
                                      <h3 className="text-sm font-medium text-gray-900">
                                        Refund Completed on {order.refundDate}
                                      </h3>
                                    </div>
                                    <p className="text-xs text-gray-800">
                                      You requested a cancellation because you
                                      changed your mind about this product.
                                    </p>
                                  </div>
                                ) : order.status === "On the way" ? (
                                  <div className="order-status-onTheWay">
                                    <div className="flex items-center gap-2 mb-1">
                                      <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                                      <h3 className="text-sm font-medium text-gray-900">
                                        Your order is on the way
                                      </h3>
                                    </div>
                                    <p className="text-xs text-gray-800">
                                      <span className="font-medium me-1">
                                        {" "}
                                        Estimated delivery :
                                      </span>
                                      {order.estimatedDelivery}
                                    </p>
                                  </div>
                                ) : order.status === "Refund Inprogress" ? (
                                  <div className="order-status-refund-inprogress">
                                    <div className="flex items-center gap-2 mb-1">
                                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                      <h3 className="text-sm font-medium text-gray-900">
                                        Refund Inprogress
                                      </h3>
                                    </div>
                                    <p className="text-xs text-gray-800">
                                      Your refund is being processed.
                                    </p>
                                  </div>
                                ) : order.status === "Refund Failed" ? (
                                  <div className="order-status-refund-failed">
                                    <div className="flex items-center gap-2 mb-1">
                                      <div className="w-3 h-3 rounded-full bg-red-600"></div>
                                      <h3 className="text-sm font-medium text-gray-900">
                                        Refund Failed on {order.refundDate}
                                      </h3>
                                    </div>
                                    <p className="text-xs text-gray-800">
                                      Your refund request has failed.
                                    </p>
                                  </div>
                                ) : (
                                  <div className="order-status-returned">
                                    <div className="flex items-center gap-2 mb-1">
                                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                      <h3 className="text-sm font-medium text-gray-900">
                                        Returned on {order.returnDate}
                                      </h3>
                                    </div>
                                    <p className="text-xs text-gray-800">
                                      Your item was successfully returned.
                                    </p>
                                  </div>
                                )}
                              </div>
                              {order.status === "Delivered" && (
                                <button className="border border-solid border-primary-200 text-primary-400 rounded-md px-6 py-2 bg-transparent hover:bg-primary-600 hover:text-white outline-none focus:outline-none text-xs ease-in-out duration-100 font-semibold">
                                  Rate & Review Product
                                </button>
                              )}
                              {order.status === "On the way" && (
                                <div className="progress-bar-wrapper mt-3 mb-3">
                                  <div className="bg-gray-200 h-1 flex items-center justify-between">
                                    <div className="w-1/3 bg-primary-600 h-1 flex items-center">
                                      <div
                                        className="bg-primary-600 h-6 w-6 rounded-full shadow flex items-center justify-center"
                                        data-tooltip-id="progress-bar-item"
                                        data-tooltip-content="Order Confirmed"
                                        data-tooltip-variant="dark"
                                      >
                                        <FaCheck className="w-3 h-3 text-white" />
                                      </div>
                                    </div>
                                    <div className="w-1/3 flex justify-between bg-primary-600 h-1 items-center">
                                      <div
                                        className="bg-primary-600 h-6 w-6 rounded-full shadow flex items-center justify-center -ml-2"
                                        data-tooltip-id="progress-bar-item"
                                        data-tooltip-content="Shipped"
                                        data-tooltip-variant="dark"
                                      >
                                        <FaCheck className="w-3 h-3 text-white" />
                                      </div>
                                      <div className="bg-white h-6 w-6 rounded-full shadow flex items-center justify-center -mr-3">
                                        <div
                                          className="h-3 w-3 bg-primary-600 rounded-full"
                                          data-tooltip-id="progress-bar-item"
                                          data-tooltip-content="Out for Delivery"
                                          data-tooltip-variant="dark"
                                        />
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
                          <div className="order-status-bottom">
                            {order.status === "Delivered" ? (
                              <div className="rounded-lg border border-dashed border-green-600 p-2 bg-green-50">
                                <div className="flex gap-2 items-center">
                                  <FaCircleCheck className="text-green-600 text-lg" />
                                  <h3 className="text-sm font-normal">
                                    <span className="text-gray-900 font-medium">
                                      Order delivered successfully
                                    </span>
                                  </h3>
                                </div>
                              </div>
                            ) : order.status === "On the way" ? (
                              <div className="rounded-lg border border-dashed border-primary-600 p-2 bg-primary-50">
                                <div className="flex gap-2 items-center">
                                  <TbProgressCheck className="text-primary-600 text-lg" />
                                  <h3 className="text-sm font-normal">
                                    <span className="text-gray-900 font-medium">
                                      Your order is Out for delivery
                                    </span>
                                  </h3>
                                </div>
                              </div>
                            ) : order.status === "Refund Completed" ? (
                              <div className="rounded-lg border border-dashed border-green-600 p-2 bg-green-50">
                                <div className="flex flex-col gap-2">
                                  <h3 className="text-sm font-medium">
                                    <span className="text-green-600 me-2">
                                      Refund Completed
                                    </span>
                                    <span className="text-xs text-[#878787]">
                                      (Refund ID :{" "}
                                      {Math.random().toFixed(10).substr(2, 20)})
                                    </span>
                                  </h3>
                                  <p className="text-xs text-gray-900">
                                    The money was added to your bank account
                                  </p>
                                </div>
                              </div>
                            ) : order.status === "Refund Inprogress" ? (
                              <div className="rounded-lg border border-dashed border-yellow-500 p-2 bg-yellow-50">
                                <div className="flex gap-2 items-center">
                                  <TbProgressCheck className="text-yellow-500 text-lg" />
                                  <h3 className="text-sm font-normal">
                                    <span className="text-gray-900 font-medium">
                                      Refund Inprogress
                                    </span>
                                  </h3>
                                </div>
                              </div>
                            ) : order.status === "Refund Failed" ? (
                              <div className="rounded-lg border border-dashed border-red-600 p-2 bg-red-50">
                                <div className="flex gap-2 items-center">
                                  <IoCloseCircle className="text-red-600 text-lg" />
                                  <h3 className="text-sm font-normal">
                                    <span className="text-gray-900 font-medium">
                                      Refund Failed
                                    </span>
                                  </h3>
                                </div>
                              </div>
                            ) : (
                              <div className="rounded-lg border border-dashed border-green-600 p-2 bg-green-50">
                                <div className="flex flex-col gap-2">
                                  <h3 className="text-sm font-medium">
                                    <span className="text-green-600 me-2">
                                      Refund Completed
                                    </span>
                                    <span className="text-xs text-[#878787]">
                                      (Refund ID :{" "}
                                      {Math.random().toFixed(10).substr(2, 10)})
                                    </span>
                                  </h3>
                                  <p className="text-xs text-gray-900">
                                    The money was added to your bank account
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
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
