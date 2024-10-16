import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import Store from "./redux/store";
import { loadUser } from "./redux/action/user";
import {
  ActivationPage,
  HomePage,
  BestDealsPage,
  EventsPage,
  AboutPage,
  FaqPage,
  CareerPage,
  BlogPage,
  PrivacyPolicyPage,
  TermsConditionsPage,
  SellerLoginPage,
  SellerRegisterPage,
} from "./Routes";
import { useSelector } from "react-redux";

const App = () => {
  const { loading } = useSelector((state) => state.user);

  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);
  return (
    <>
      {loading ? null : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />

            {/* TODO: ise seller"sign-in" aur "sign-up" route bnne ke ise bd badlna hai */}
            <Route path="/seller-login" element={<SellerLoginPage />} />
            <Route path="/seller-register" element={<SellerRegisterPage />} />
            {/* ------------------------------------------------------------------- */}
            <Route
              path="/activation/:activation_token"
              element={<ActivationPage />}
            />
            <Route path="/best-deals" element={<BestDealsPage />} />
            <Route path="/events" element={<EventsPage />} />

            {/* Company */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/careers" element={<CareerPage />} />
            <Route path="/blog" element={<BlogPage />} />

            {/* Legal */}
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-conditions" element={<TermsConditionsPage />} />
          </Routes>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            toastStyle={{
              margin: "auto",
              marginTop: "10px",
              borderRadius: "10px"
            }}
          />
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
