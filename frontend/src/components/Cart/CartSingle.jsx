/* eslint-disable react/prop-types */
import { useState } from "react";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import "./CartSingle.css";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
const CartSingle = ({ data }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.price * value;

  const truncateText = (text, maxWords = 10, maxChars = 42) => {
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
  const pName = data.name;
  const product_name = pName.toLowerCase().replace(/\s+/g, "-");
  return (
    <>
      <div className="border-b p-4 relative">
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
                  {truncateText(data.name)}
                </h6>
              </Link>
              <div className="flex justify-start gap-2 items-center">
                <h4 className="text-[18px] font-medium">
                  <span className="rupee-icon mr-1">₹</span>
                  {totalPrice}
                </h4>
              </div>
            </div>
          </div>
        </div>
        <RxCross1 className="bg-error-700 hover:bg-error-800 cursor-pointer absolute text-white w-5 h-5 p-1 rounded-full top-[-5px] right-0" />
      </div>
    </>
  );
};

export default CartSingle;
