// Import Routes
import { Route, Routes } from "react-router-dom";
// Auth Layout
import AuthLayout from "./Components/Layouts/AuthLayout";
// Pages
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
// Main Layout
import MainLayout from "./Components/Layouts/MainLayout";
// Pages
import Home from "./Pages/Home";
import About from "./Pages/About";
import ContactUs from "./Pages/ContactUsPage";
import Category from "./Pages/Category";
import SubCategoryGiftCards from "./Pages/SubCategoryGiftCards";
import GiftCardDetails from "./Pages/GiftCardDetails";
import Status from "./Pages/Status";
import ForgotPasswordTwo from "./Pages/ForgotPassword";
import Contact from "./Pages/Contact";
import Resetpassword from "./Pages/Resetpassword";
import Giftcard from "./Pages/Giftcard";
import SpecificItemInfo from "./Pages/SpecificItemInfo";
import Forgotpasswordtwo from "./Components/Signup/Forgotpasswordotp";
import ForgotPassword from "./Pages/ForgotPassword";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Profile from "./Pages/Profile";
import VerifySignupOtp from "./Components/Signup/VerifySignupOtp";
import Wishlist from "./Pages/WishlistPage";
import ComingPage from "./Pages/ComingPage";
import Search from "./Pages/search";
import Order from "./Pages/OrderHistory";
// Policy pages
import Privacy from "./Pages/Privacy";
import TermsPage from "./Pages/TermsPage";
import Payment from "./Pages/Payment";
import Cookie from "./Pages/Cookie";
import WhyuS from "./Pages/WhyUsPage";
import Faq from "./Pages/FaqPage";
// 404
import PageNotFound from "./Pages/PageNotFound";
import ScrollToTop from "./Components/ScrollToTop";
// Css
import "./App.css";
import "./Css/style.css";
import "./Css/media.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import Thankyou from "./Pages/Thankyou";
import Failure from "./Pages/Failure";
import MainForgotPasswordRequest from "./Pages/MainForgotPasswordRequest.jsx";
import ForgetPasswordHandlePage from "./Pages/ForgetPasswordHandlePage.jsx";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/thank-you" element={<Thankyou />} />
          <Route path="/failure" element={<Failure />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/aboutUs" element={<About />} />
          <Route path="/whyus" element={<WhyuS />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route
            path="/categories/:categoryName/:categoryId"
            element={<Category />}
          />
          <Route
            path="/gift-cards/:categoryId/:subCategoryName"
            element={<SubCategoryGiftCards />}
          />
          <Route
            path="/gifts/:productTag/:productName/:id"
            element={<GiftCardDetails />}
          />
          <Route path="/statusnumber" element={<Status />} />
          <Route path="/forgotpasswordotp" element={<ForgotPasswordTwo />} />
          <Route
            path="/category/:categoryId/:companyId/:SpecificInfo"
            element={<SpecificItemInfo />}
          />
          <Route
            path="/category/:categoryId/:companyId"
            element={<Giftcard />}
          />
          <Route path="/verifyotp" element={<Forgotpasswordtwo />} />
          <Route path="/verifysignupotp" element={<VerifySignupOtp />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/forgotpassword" element={<ForgotPassword />} /> */}
          <Route
            path="/forgotpassword"
            element={<MainForgotPasswordRequest />}
          />

          <Route
            path="/forgetPasswordHandlePage"
            element={<ForgetPasswordHandlePage />}
          />

          <Route path="/resetpassword" element={<Resetpassword />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/orderhistory" element={<Order />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/termsandcondition" element={<TermsPage />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/cookie" element={<Cookie />} />
          <Route path="/search" element={<Search />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path="/comingsoon" element={<ComingPage />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
