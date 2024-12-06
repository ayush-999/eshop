import React from "react";
import { IoCloseCircle } from "react-icons/io5";
import { FaCircleCheck } from "react-icons/fa6";
import { TbProgressCheck } from "react-icons/tb";

const OrderStatus = ({ status }) => {
  return (
    <div className="order-status-bottom">
      {status === "delivered" ? (
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
      ) : status === "out_for_delivery" ? (
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
      ) : status === "cancelled" ? (
        <div className="rounded-lg border border-dashed border-green-600 p-2 bg-green-50">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <FaCircleCheck className="text-green-600 text-lg" />
              <h3 className="text-sm font-medium">
                <span className="text-green-600 me-2">Refund Completed</span>
                <span className="text-xs text-[#878787]">
                  (Refund ID : {Math.random().toFixed(10).substr(2, 20)})
                </span>
              </h3>
            </div>
            <p className="text-xs text-gray-900">
              The money was added to your bank account
            </p>
          </div>
        </div>
      ) : status === "returned" ? (
        <div className="rounded-lg border border-dashed border-green-600 p-2 bg-green-50">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <FaCircleCheck className="text-green-600 text-lg" />
              <h3 className="text-sm font-medium">
                <span className="text-green-600 me-2">Refund Completed</span>
                <span className="text-xs text-[#878787]">
                  (Refund ID : {Math.random().toFixed(10).substr(2, 20)})
                </span>
              </h3>
            </div>
            <p className="text-xs text-gray-900">
              The money was added to your bank account
            </p>
          </div>
        </div>
      ) : status === "refund_in_progress" ? (
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
      ) : status === "refund_failed" ? (
        <div className="rounded-lg border border-dashed border-red-600 p-2 bg-red-50">
          <div className="flex gap-2 items-center">
            <IoCloseCircle className="text-red-600 text-lg" />
            <h3 className="text-sm font-normal">
              <span className="text-gray-900 font-medium">Refund Failed</span>
            </h3>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default OrderStatus;
