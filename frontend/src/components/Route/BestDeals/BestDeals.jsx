import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { FiChevronRight } from "react-icons/fi";
import ProductCard from "../ProductCard/ProductCard.jsx";
import { productData } from "../../../static/data";

const BestDeals = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const d =
      productData && productData.sort((a, b) => b.total_sell - a.total_sell);
    const firstSix = d.slice(0, 6);
    setData(firstSix);
  }, []);
  return (
    <>
      <div className="grid grid-cols-12 gap-3 mb-6">
        <div className="col-span-10 bestDeals-wrapper">
          <div
            className="bg-white p-6 rounded-lg mb-6 shadow-sm"
            id="bestDeals"
          >
            <div className="flex justify-between items-center mb-5">
              <h1 className="font-bold text-base">Best Deals</h1>
              <Link
                to="/"
                className="bg-primary-600 hover:bg-primary-700 p-1 text-white rounded-full"
              >
                <FiChevronRight />
              </Link>
            </div>
            <Swiper
              slidesPerView={5}
              spaceBetween={10}
              navigation={true}
              modules={[Navigation]}
              className="bestDealsSlider"
            >
              {data &&
                data.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="w-full h-[280px] ">
                      <ProductCard data={item} />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
        <div className="col-span-2 ad-wrapper">
          <div className="bg-white rounded-lg h-[372px]" id="bestDeals-ad">
            <Link to="/">
              <img
                src="https://rukminim2.flixcart.com/fk-p-flap/530/810/image/f5baa2f1958049b3.jpeg?q=20"
                className="w-full h-full object-cover rounded-lg"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BestDeals;
