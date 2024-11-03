import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Layout/Header";
import ProfileSideBar from "../../components/Layout/SideBar/ProfileSideBar";
import Footer from "../../components/Layout/Footer";

const AccountPage = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const handleProfileRefresh = () => setRefreshKey((prevKey) => prevKey + 1);
  return (
    <>
      <Header />
      <div className="max-w-screen-xl mx-auto mt-10 md:mt-16 mb-6 sm:px-6 lg:px-0">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-3 sideBar-wrapper">
            <ProfileSideBar />
          </div>
          <div className="col-span-9">
            <Outlet context={{ handleProfileRefresh }} key={refreshKey} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AccountPage;
