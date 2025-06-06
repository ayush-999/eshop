import { Outlet } from "react-router-dom";
import Header from "../components/Layout/Header";
import ProfileSideBar from "../components/Layout/SideBar/ProfileSideBar";
import Footer from "../components/Layout/Footer";

const ProfilePage = () => {
  return (
    <>
      <Header />
      <div className="max-w-screen-sm md:max-w-screen-xl mx-auto mt-10 md:mt-16 mb-6 sm:px-6 lg:px-0">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-3">
            <div className="sideBar-wrapper sticky top-16 z-10">
              <ProfileSideBar />
            </div>
          </div>
          <div className="col-span-9">
            <div className="bg-white p-6 rounded-lg shadow-xs">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default ProfilePage;
