import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Layout/Header";
import ProfileSideBar from "../components/Layout/SideBar/ProfileSideBar";
import Footer from "../components/Layout/Footer";

const AccountPage = () => {
  return (
    <>
      <Header />
      <div className="max-w-screen-xl mx-auto mt-10 md:mt-16 mb-6 sm:px-6 lg:px-0">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-3 sideBar-wrapper">
            <ProfileSideBar />
          </div>
          <div className="col-span-9">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AccountPage;