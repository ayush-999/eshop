import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
const BlogPage = () => {
  return (
    <>
      <Header />
      <div className="max-w-screen-xl mx-auto mt-10 md:mt-16 mb-6 sm:px-6 lg:px-0">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-6 sideBar-wrapper">
            <div className="bg-white p-6 rounded-lg shadow-xs" id=""></div>
          </div>
          <div className="col-span-6 dealsPage-wrapper">
            <div className="bg-white p-6 rounded-lg shadow-xs" id=""></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogPage;
