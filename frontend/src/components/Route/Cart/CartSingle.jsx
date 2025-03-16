/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  HiOutlineInformationCircle,
  HiOutlineMinus,
  HiPlus,
} from "react-icons/hi";
import "./CartSingle.css";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { truncateText } from "../../../utils/helper";
const CartSingle = ({ data }) => {
  const [value, setValue] = useState(1);
  const pName = data.name;
  const product_name = pName.toLowerCase().replace(/\s+/g, "-");
  return (
    <>
      <div className="border-b border-gray-200 p-4 relative">
        <div className="w-full flex gap-3 items-start justify-start prevent-select">
          <div className="text-center">
            <div
              className="w-7 h-7 flex justify-center items-center text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:bg-primary-600 font-medium rounded-full text-sm text-center ease-in-out duration-100 cursor-pointer"
              onClick={() => setValue(value + 1)}
            >
              <HiPlus className="size-3" />
            </div>
            <span className="py-2">{value}</span>
            <div
              className="w-7 h-7 flex justify-center items-center text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:bg-primary-600 font-medium rounded-full text-sm text-center ease-in-out duration-100 cursor-pointer"
              onClick={() => setValue(value === 1 ? 1 : value - 1)}
            >
              <HiOutlineMinus className="size-3" />
            </div>
          </div>
          <div className="flex gap-3 justify-between items-start">
            <Link to={`/product/${product_name}`}>
              <img
                src={data.image_Url[0]?.url}
                alt={data.name}
                className="cart-img"
              />
            </Link>
            <div className="flex flex-col gap-2 justify-between">
              <Link to={`/product/${product_name}`}>
                <h6 className="text-sm font-semibold">
                  {truncateText(data.name, 10, 42)}
                </h6>
              </Link>
              <div className="flex justify-start gap-2 items-center">
                <h5 className="cart-discount_price">
                  <span className="text-[18px] font-medium mr-1">₹</span>
                  {data.price === 0 ? data.price : data.discount_price}
                </h5>
                {data.price && data.price !== data.discount_price && (
                  <h5 className="cart-price">
                    (<span className="mr-0">₹</span>
                    {data.price})
                  </h5>
                )}
                <div className="cart-discount">
                  <p>
                    <span className="mr-1">70%</span>
                    off
                  </p>
                </div>
                <div className="cursor-pointer text-[20px] text-[#878787]">
                  <HiOutlineInformationCircle />
                </div>
              </div>
            </div>
          </div>
        </div>
        <AiOutlineDelete className="text-gray-500 text-[16px] hover:text-error-700 cursor-pointer absolute top-[5px] right-0" />
      </div>
    </>
  );
};

export default CartSingle;
