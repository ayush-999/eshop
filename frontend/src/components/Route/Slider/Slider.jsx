import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { sliderItems } from "../../../static/data";

const Slider = () => {
  return (
    <div className="slider-wrapper">
      <Swiper
        slidesPerView={1}
        loop={true}
        navigation={true}
        pagination={{
          dynamicBullets: true,
          clickable: true, 
        }}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Navigation, Pagination]}
        className="mySwiper"
      >
        {sliderItems.map((item, index) => (
          <SwiperSlide key={index}>
            <Link to={item.url}>
              <img
                src={item.image_Url}
                className="h-[270px] object-cover bg-center bg-no-repeat"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
