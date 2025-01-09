import { useEffect, useState } from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import CartDetails from "../components/Route/Cart/CartDetails";
import CartNotFound from "../components/NotFound/CartNotFound";
import { productData } from "../static/data";

const CartPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const d =
      productData && productData.sort((a, b) => b.total_sell - a.total_sell);
    const firstFour = d.slice(0, 2);
    setData(firstFour);
  }, []);

  return (
    <>
      <Header />
      <div className="max-w-screen-sm md:max-w-screen-xl mx-auto mt-10 md:mt-16 mb-6 sm:px-6 lg:px-0">
        {data && data.length > 0 ? (
          <CartDetails data={data} />
        ) : (
          <CartNotFound />
        )}
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
