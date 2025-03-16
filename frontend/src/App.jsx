import { useEffect, Suspense, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./redux/store";
import { loadUser, loadSeller } from "./redux/action/user";
import { useSelector } from "react-redux";
// Routes
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
  ProfilePage,
  Wishlist,
  ProductDetailsPage,
  ShopPage,
} from "./Routes";
// Lazy-loaded Routes
import {
  ProfileInformation,
  ManageAddresses,
  ManageWallet,
  MyOrder,
  OrderDetailsPage,
  CartPage,
} from "./LazyRoutes";
import LoadingSpinner from "./components/Loader/LoadingSpinner";
import ProtectedRoute from "./ProtectedRoute";

// App Component
const App = () => {
  /** 
  // For Testing
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000); 
    return () => clearTimeout(timer);
  }, []);
 
  */
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
  }, []);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* TODO: ise seller"sign-in" aur "sign-up" route bnne ke ise bd badlna hai 👇 */}
            <Route path="/seller-login" element={<SellerLoginPage />} />
            <Route path="/seller-register" element={<SellerRegisterPage />} />
            
            {/* ------------------------------------------------------------------- */}
            <Route
              path="/activation/:activation_token"
              element={<ActivationPage />}
            />
            <Route path="/product/:name" element={<ProductDetailsPage />} />
            <Route path="/best-deals" element={<BestDealsPage />} />
            <Route path="/events" element={<EventsPage />} />
            {/* TODO: ise dynamically me badlna hai 👇 */}
            <Route
              path="/account"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ProfilePage />
                </ProtectedRoute>
              }
            >
              <Route path="wishlist" element={<Wishlist />} />
              <Route
                path="profile"
                element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <ProfileInformation />
                  </Suspense>
                }
              />
              <Route
                path="addresses"
                element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <ManageAddresses />
                  </Suspense>
                }
              />
              <Route
                path="wallet"
                element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <ManageWallet />
                  </Suspense>
                }
              />
              <Route
                path="orders"
                element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <MyOrder />
                  </Suspense>
                }
              />
            </Route>
            <Route
              path="/order_details/:order_id"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <OrderDetailsPage />
                </Suspense>
              }
            />
            <Route
              path="viewcart"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Suspense fallback={<LoadingSpinner />}>
                    <CartPage />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route path="/shop/:id" element={<ShopPage />} />
            {/* ------------------------------------------------------------------- */}
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
              borderRadius: "10px",
            }}
          />
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
