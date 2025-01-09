import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShopDetail from "../components/Route/Shop/ShopDetail";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { productData } from "../static/data";
import ShopNotFound from "../components/NotFound/ShopNotFound";
const ShopPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    if (id) {
      // Convert id to a number
      const shopId = parseInt(id, 10);

      // Find shop data that matches the given id
      const shop = productData.find((item) => item.shop.id === shopId);
      setData(shop);
    }
  }, [id]);

  return (
    <>
      <Header />
      <div className="max-w-screen-xl mx-auto mt-10 md:mt-16 mb-6 sm:px-6 lg:px-0">
        {data ? <ShopDetail data={data} /> : <ShopNotFound />}
      </div>
      <Footer />
    </>
  );
};

export default ShopPage;
