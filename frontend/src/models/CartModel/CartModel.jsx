import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productData } from "../../static/data";
import "./CartModel.css";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import CartSingle from "../../components/Route/Cart/CartSingle";
import CartNotFound from "../../components/NotFound/CartNotFound";

const CartModel = ({ setOpen }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const d =
      productData && productData.sort((a, b) => b.total_sell - a.total_sell);
    const firstFour = d.slice(0, 4);
    setData(firstFour);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10 cartWrapper">
      <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between p-5 shadow-xs">
        <RxCross1 className="cart-close" onClick={() => setOpen(false)} />
        <div>
          <div className="flex w-full justify-between mt-6 mb-4 cart-top-wrapper">
            <div className="flex w-full justify-start items-start gap-2">
              <IoBagHandleOutline className="cart-icon size-6" />
              <h5 className="text-[1.125rem] font-[500]">{data.length} items</h5>
            </div>
          </div>
          <div className="flex w-full flex-col justify-start gap-3 overflow-y-scroll h-[80vh] cart-middle-wrapper">
            {data && data.length > 0 ? (
              data.map((i, index) => <CartSingle key={index} data={i} />)
            ) : (
              <CartNotFound />
            )}
          </div>
          <div className="flex w-full justify-start gap-3 cart-bottom-wrapper">
            <Link
              to="/viewcart"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:bg-primary-600 px-5 py-3 font-semibold rounded-lg text-sm text-center ease-in-out duration-100"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModel;
