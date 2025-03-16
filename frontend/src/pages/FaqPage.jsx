import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";

const FaqPage = () => {
  return (
    <>
      <Header />
      <div className="max-w-screen-xl mx-auto mt-10 md:mt-16 mb-6 sm:px-6 lg:px-0">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-6 sideBar-wrapper">
          <div className="bg-white p-6 rounded-lg shadow-xs" id=""></div>
          </div>
          <div className="col-span-6 dealsPage-wrapper">
            <div className="bg-white p-6 rounded-lg shadow-xs" id="">
              {/* Follow https://www.youtube.com/watch?v=XxnUSZOgMLY&list=PLyah27R0n8V4Kcao94Qlt-xJ0bHxZfBjk time: 07:14:00 */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FaqPage;
