import React from "react";
import { CgSoftwareDownload } from "react-icons/cg";
import "./OrderDetails.css";
import { FaCheck } from "react-icons/fa6";
import { formatDate } from "../../../../utils/helper";
import { HiOutlineInformationCircle } from "react-icons/hi2";

const OrderDetails = ({ data }) => {
  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-sm mb-3">
        <div className="grid grid-cols-12 rounded-lg border-dashed border border-primary-200">
          <div className="col-span-6 orderDetails-l-wrapper p-5 border-dashed border-r border-primary-200">
            <h1 className="text-lg font-medium mb-3">Delivery Address</h1>
            <div className="orderDetails-delivery">
              <h3 className="text-sm font-medium text-gray-900">Ayush</h3>
              <p className="text-xs text-gray-600 mt-1 mb-3 w-[70%]">
                {data.address.street}, {data.address.city}, {data.address.state}{" "}
                - {data.address.zipCode}, {data.address.country}
              </p>
              <h3 className="text-sm font-medium text-gray-900">
                Phone number
              </h3>
              <p className="text-xs font-normal text-gray-600 mt-1 w-[70%]">
                9993832158, 0123456789
              </p>
            </div>
          </div>
          <div className="col-span-6 p-5 orderDetails-r-wrapper">
            <h1 className="text-lg font-medium mb-3">More actions</h1>
            <div className="flex items-center justify-between orderDetails-invoice ">
              <div className="flex items-center gap-2">
                <img
                  src="/assets/img/invoice.png"
                  className="w-6 rounded-full"
                />
                <span className="text-sm text-gray-900">Download Invoice</span>
              </div>
              <div className="orderDetails-Invoice-download">
                <button
                  type="submit"
                  class="bg-primary-600 hover:bg-primary-700 text-white rounded-md py-1.5 px-5 flex items-center gap-1"
                >
                  <CgSoftwareDownload className="w-4 h-4" />
                  <span className="text-white font-normal text-xs">
                    Download
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="grid grid-cols-12 rounded-lg border-dashed border border-primary-200">
          <div className="col-span-6 p-5 border-dashed border-r border-primary-200">
            <div className="flex gap-2">
              <div className="order-details-img">
                <img
                  src={data.product.image_Url[0].url}
                  className="w-16 h-16 object-contain"
                  alt={data.product.name}
                />
              </div>
              <div className="order-details-text">
                <h3 className="text-sm font-medium mb-1">
                  {data.product.name}
                </h3>
                <p className="text-xs text-[#878787] mb-1">
                  Color: {data.product.shop.name} | Size:{" "}
                  {data.product.category || "N/A"}
                </p>
                <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
                 <span> ₹ {data.product.price.toLocaleString()}</span>
                  <div className="info-wrap cursor-pointer text-[18px] text-[#878787]">
                    <HiOutlineInformationCircle />
                  </div>
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-sm text-gray-400 font-normal mt-3">
                Return policy ended on Oct 26
              </p>
              <button className="border border-solid border-primary-200 text-primary-400 rounded-md px-6 py-2 bg-transparent hover:bg-primary-600 hover:text-white outline-none focus:outline-none text-xs ease-in-out duration-100 font-semibold">
                Rate & Review Product
              </button>
            </div>
          </div>
          <div className="col-span-6 p-5 border-dashed border-r border-primary-200">
            <div className="progress-bar-wrapper">
              <div className="bg-gray-200 h-1 flex items-center justify-between mt-8">
                <div className="w-1/3 bg-green-600 h-1 flex items-center">
                  <div className="flex flex-col items-start">
                    <p className="text-xs text-green-600 font-medium mb-2">
                      Order Confirmed
                    </p>
                    <div className="bg-green-600 h-6 w-6 rounded-full shadow flex items-center justify-center">
                      <FaCheck className="w-3 h-3 text-white" />
                    </div>
                    <p className="text-xs text-gray-600 font-medium mt-2">
                      {formatDate(data.confirmedDate)}
                    </p>
                  </div>
                </div>
                <div className="w-1/3 bg-green-600 h-1 flex items-center">
                  <div className="flex flex-col items-start">
                    <p className="text-xs text-green-600 font-medium mb-2">
                      Shipped
                    </p>
                    <div className="bg-green-600 h-6 w-6 rounded-full shadow flex items-center justify-center">
                      <FaCheck className="w-3 h-3 text-white" />
                    </div>
                    <p className="text-xs text-gray-600 font-medium mt-2">
                      {formatDate(data.shippedDate)}
                    </p>
                  </div>
                </div>
                <div className="w-1/3 bg-green-600 h-1 flex items-center">
                  <div className="flex flex-col items-start">
                    <p className="text-xs text-green-600 font-medium mb-2">
                      Out for delivery
                    </p>
                    <div className="bg-green-600 h-6 w-6 rounded-full shadow flex items-center justify-center">
                      <FaCheck className="w-3 h-3 text-white" />
                    </div>
                    <p className="text-xs text-gray-600 font-medium mt-2">
                      {formatDate(data.outForDeliveryDate)}
                    </p>
                  </div>
                </div>
                <div className="w-1/ flex justify-end">
                  <div className="bg-white h-6 w-6 rounded-full shadow" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
