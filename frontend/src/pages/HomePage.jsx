import Header from "../components/Layout/Header";
import Slider from "../components/Route/Slider/Slider";
import Branding from "../components/Route/Branding/Branding";
import Categories from "../components/Route/Categories/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import Events from "../components/Events/Events.jsx";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct";
import Footer from "../components/Layout/Footer.jsx";

const HomePage = () => {
  return (
    <>
      <Header />
      <div className="max-w-screen-xl mx-auto mt-10 md:mt-16 mb-6 sm:px-6 lg:px-0">
        <Slider />
        <Categories/>
        <Branding/>
        <BestDeals/>
        <Events/>
        <FeaturedProduct/>
      </div>
      <Footer/>
    </>
  );
};

export default HomePage;
