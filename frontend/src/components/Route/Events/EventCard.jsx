import { FaAnglesRight } from "react-icons/fa6";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { Link } from "react-router-dom";
import Countdown from "../../Countdown/Countdown";

const EventCard = () => {
  return (
    // TODO: Need to work on this page
    <div className="grid grid-cols-12 gap-3">
      <div className="col-span-5">
        <div className="w-full event-left mx-auto">
          <img
            src="https://dummyimage.com/420x420/000/fff&text=Product"
            className="eventImg"
          />
        </div>
      </div>

      <div className="col-span-7">
        <div className="w-full event-right">
          <h1 className="event-title truncate-text">
          Product Name
          </h1>
          <p className="event-detail">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting...
            <Link to="" className="text-blue-500 cursor-pointer">
              see details
            </Link>
          </p>
          <div className="flex items-center justify-start gap-2 mb-2">
            <h4 className="text-[22px] font-medium">
              <span className="rupee-icon mr-1">₹</span>
              79000
            </h4>
            <h3 className="text-[14px] line-through text-[#878787] font-medium">
              (<span className="rupee-icon mr-[2px]">₹</span>85000)
            </h3>
            <div className="event-discount-wrap">
              <h3 className="event-discount-text">21% off</h3>
              <div className="info-wrap cursor-pointer text-[20px] text-[#878787]">
                <HiOutlineInformationCircle />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-start gap-2 mb-2">
            <Countdown />
            <span className="bg-[#f8f8ff] text-[#616173] text-xs font-medium me-2 px-[10px] py-[4px] rounded-full">
              Free Delivery
            </span>
          </div>
          <div className="flex items-center mt-3 justify-between">
            <button
              type="submit"
              className="w-full border border-solid border-primary-600 text-primary-600 rounded-lg px-1.5 py-2.5 flex items-center justify-center gap-1 bg-transparent hover:bg-primary-600 hover:text-white outline-none focus:outline-none text-sm ease-in-out duration-100 font-medium"
            >
              Buy Now
              <FaAnglesRight className="text-[14px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
