import Header from "../components/Layout/Header";
import Slider from "../components/Route/Slider/Slider";
import Branding from "../components/Route/Branding/Branding";
import Categories from "../components/Route/Categories/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals.jsx";
const HomePage = () => {
  return (
    <>
      <Header activeHeading={1} />
      <div className="max-w-screen-xl mx-auto mt-16 mb-6">
        <Slider />
        <Categories/>
        <Branding/>
        <BestDeals/>
      </div>
    </>
  );
};

export default HomePage;
