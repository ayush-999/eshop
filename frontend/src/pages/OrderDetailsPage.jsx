import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ordersData } from "../static/data";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import OrderNotFound from "../components/Error/OrderNotFound";
import OrderDetails from "../components/Route/Order/OrderDetails/OrderDetails";

const OrderDetailsPage = () => {
  const { order_id } = useParams(); // Correctly extract order_id from useParams
  const [data, setData] = useState(null);

  useEffect(() => {
    const order = ordersData.find((i) => i.order_id === order_id);
    setData(order);
  }, [order_id]); // Add order_id as a dependency to useEffect

  return (
    <>
      <Header />
      <div className="max-w-screen-xl mx-auto mt-10 md:mt-16 mb-6 sm:px-6 lg:px-0">
        {data ? <OrderDetails data={data} /> : <OrderNotFound />}
      </div>
      <Footer />
    </>
  );
};

export default OrderDetailsPage;
