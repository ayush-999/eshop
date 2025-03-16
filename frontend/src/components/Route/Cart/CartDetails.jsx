import { useSelector } from "react-redux";
import LoadingSpinner from "../../Loader/LoadingSpinner";
import { truncateText } from "../../../utils/helper";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import {
  HiOutlineInformationCircle,
  HiOutlineMinus,
  HiPlus,
} from "react-icons/hi";
import { FaCircleCheck } from "react-icons/fa6";

const CartDetails = ({ data }) => {
  const { user, dataLoading } = useSelector((state) => state.user) || {};
  const defaultAddress = user?.addresses?.find(
    (address) => address.isDefault === 1
  );
  console.log(data);
  return (
    <>
      {dataLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-8">
            <div className="w-full">
              <div className="bg-white p-6 rounded-lg shadow-xs">
                <div className="flex justify-start items-center mb-5">
                  <h1 className="text-gray-900 text-lg font-semibold">
                    Cart Details
                  </h1>
                </div>
                <div className="border border-dashed border-primary-200 rounded-lg mb-2">
                  <div className="flex flex-col gap-2 p-5">
                    <div className="flex justify-between items-center address-head">
                      <div className="address-head-text flex justify-between items-center gap-2">
                        <p className="text-sm font-normal">Deliver to :</p>
                        <h1 className="text-sm font-semibold">
                          <span className="text-gray-900 me-1">
                            {defaultAddress.name},
                          </span>
                          <span className="text-gray-900 me-1">
                            {defaultAddress.pincode}
                          </span>
                        </h1>
                        <div className="bg-primary-100 py-1 px-3 rounded-[.25rem] inline-block text-primary-600 text-[10px] font-semibold capitalize">
                          {defaultAddress.addressType}
                        </div>
                      </div>
                      <div className="address-head-button">
                        <button className="border border-solid border-primary-200 text-primary-400 rounded-md px-6 py-2 bg-transparent hover:bg-primary-600 hover:text-white outline-none focus:outline-none text-[10px] ease-in-out duration-100 font-semibold">
                          Change
                        </button>
                      </div>
                    </div>
                    <div className="address-body">
                      <div className="address-body-text">
                        <h3 className="text-sm font-normal">
                          <span className="text-gray-500 me-1">
                            {truncateText(defaultAddress.userAddress, 20, 100)}
                          </span>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border border-dashed border-primary-200 rounded-lg mb-2">
                  {data.map((item, index) => (
                    <div
                      key={index}
                      className="p-3 cart-view-wrap border-b border-dashed last:border-b-0 border-primary-200 relative"
                    >
                      <div className="grid grid-cols-12 gap-3">
                        <div className="col-span-8">
                          <div className="cart-item grid grid-cols-12 gap-3">
                            <div className="col-span-3">
                              <Link to="#">
                                <img
                                  src={item.image_Url[0]?.url}
                                  alt={item.name}
                                  className="cart-image"
                                />
                              </Link>
                            </div>
                            <div className="col-span-9">
                              <Link to="#">
                                <h1 className="text-[16px] font-semibold mb-2">
                                  {truncateText(item.name, 30, 75)}
                                </h1>
                              </Link>
                              <div className="flex items-center justify-start gap-2 mb-3">
                                <div className="cart-rating flex items-center justify-start gap-1">
                                  <FaStar />
                                  <p className="font-semibold">
                                    {item.ratings}
                                  </p>
                                </div>
                                <p className="text-[#878787] text-[10px] font-normal">
                                  105098 Ratings, 21052 Reviews
                                </p>
                              </div>
                              <div className="flex items-center justify-start gap-3">
                                <div className="cart-price-wrap">
                                  <h5 className="cart-discount_price font-semibold">
                                    <span className="mr-1">₹</span>
                                    {item.price === 0
                                      ? item.price
                                      : item.discount_price}
                                  </h5>
                                  {item.price &&
                                    item.price !== item.discount_price && (
                                      <h5 className="cart-price font-semibold">
                                        (<span className="mr-0">₹</span>
                                        {item.price})
                                      </h5>
                                    )}
                                </div>
                                <p className="cart-discount font-semibold">
                                  <span className="mr-1">70%</span>
                                  off
                                </p>
                                <div className="cursor-pointer text-[20px] text-[#878787]">
                                  <HiOutlineInformationCircle />
                                </div>
                              </div>
                            </div>
                            <div className="col-span-12">
                              <div className="flex items-center justify-start gap-10">
                                <div className="cart-quantity flex gap-2 items-center">
                                  <button className="cart-quantity-btn bg-primary-100 hover:bg-primary-600 hover:text-white p-2 rounded-full transition-all inline-block text-primary-600 text-[10px] font-semibold capitalize">
                                    <HiOutlineMinus className="size-3" />
                                  </button>
                                  <div className="input-container">
                                    <input
                                      type="text"
                                      className="cart-quantity-input bg-gray-50 border text-gray-900 rounded-lg block w-10 p-2 disabled:bg-gray-100 disabled:text-gray-500 text-center"
                                      value="1"
                                    />
                                  </div>
                                  <button className="cart-quantity-btn bg-primary-100 hover:bg-primary-600 hover:text-white p-2 rounded-full transition-all inline-block text-primary-600 text-[10px] font-semibold capitalize">
                                    <HiPlus className="size-3" />
                                  </button>
                                </div>
                                <button className="cart-remove bg-error-50 hover:bg-error-800 hover:text-white px-5 py-2 rounded-md transition-all inline-block text-error-800 text-[10px] font-semibold capitalize">
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-4">
                          <div className="estimate-delivery-date">
                            <div className="flex justify-start items-center gap-2">
                              <h1 className="text-sm font-normal border-r border-gray-400 pr-2">
                                Delivery in Sat, 29th Jan
                              </h1>
                              <p className="text-sm font-normal text-green-600">
                                Free Delivery
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end items-center mt-5">
                  <button
                    type="submit"
                    className="bg-primary-600 hover:bg-primary-700 text-white rounded-lg py-3 px-10 font-semibold transition-all md:text-sm"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-4">
            <div className="w-full">
              <div className="bg-white p-6 rounded-lg shadow-xs">
                <div className="flex justify-start items-center mb-5">
                  <h1 className="text-gray-900 text-lg font-semibold">
                    Price Details
                  </h1>
                </div>
                <div className="border border-dashed border-primary-200 rounded-lg mb-2">
                  <div className="p-5">
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-sm font-normal">Price (2 item)</p>
                      <p className="text-sm font-semibold">
                        ₹{data.reduce((total, item) => total + item.price, 0)}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-sm font-normal">Discount</p>
                      <p className="text-sm font-semibold text-green-600">
                        -₹
                        {data.reduce(
                          (total, item) =>
                            total + (item.price - item.discount_price),
                          0
                        )}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-sm font-normal">Delivery Charges</p>
                      <p className="text-sm font-semibold text-green-600">
                        Free
                      </p>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-sm font-normal">Platform Fee</p>
                      <p className="text-sm font-semibold">₹9</p>
                    </div>
                    <hr className="my-3" />
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-base font-semibold">Total Amount</p>
                      <p className="text-base font-semibold">
                        ₹
                        {data.reduce(
                          (total, item) => total + item.discount_price,
                          0
                        ) + 9}
                      </p>
                    </div>
                    <div className="rounded-lg border border-dashed border-green-600 p-2 bg-green-50">
                      <div className="flex items-center gap-2">
                      <FaCircleCheck className="text-green-600 text-lg" />
                        <p className="text-sm font-semibold text-green-600">
                          You will save ₹
                          {data.reduce(
                            (total, item) =>
                              total + (item.price - item.discount_price),
                            0
                          )}{" "}
                          on this order
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartDetails;
