import EventCard from "../components/Route/Events/EventCard";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import PageSideBar from "../components/Layout/SideBar/PageSideBar";

const EventsPage = () => {
  return (
    <>
      <Header />
      <div className="max-w-screen-xl mx-auto mt-10 md:mt-16 mb-6 sm:px-6 lg:px-0">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-3">
            <div className="sideBar-wrapper sticky top-16 z-10">
              <PageSideBar onApplyFilter="" />
            </div>
          </div>
          <div className="col-span-9 dealsPage-wrapper">
            <div
              className="bg-white p-6 rounded-lg shadow-xs"
              id="popularEvents"
            >
              <EventCard />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EventsPage;
