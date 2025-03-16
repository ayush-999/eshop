import { Link } from "react-router-dom";
import "./events.css";
import { FiChevronRight } from "react-icons/fi";
import EventCard from "./EventCard.jsx";
import SuggestionCard from "../Suggestion/SuggestionCard.jsx";
const Events = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-3 mb-6">
        <div className="col-span-4">
          <div
            className="bg-white p-6 rounded-lg shadow-xs"
            id="popularEvents"
          >
            <div className="flex justify-between items-center mb-5">
              <h1 className="font-bold text-base">Suggested for You</h1>
            </div>
            <SuggestionCard />
          </div>
        </div>
        <div className="col-span-8">
          <div
            className="bg-white p-6 rounded-lg shadow-xs"
            id="popularEvents"
          >
            <div className="flex justify-between items-center mb-5">
              <h1 className="font-bold text-base">Popular Events</h1>
              <Link
                to="/events"
                className="bg-primary-600 hover:bg-primary-700 p-1 text-white rounded-full" title="view all"
              >
                <FiChevronRight />
              </Link>
            </div>
            <EventCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default Events;
