import { Outlet } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";
// import Footer from "../common/Footer";

const AuthLayout = () => {
  return (
    <>
      <Header isAuthLayout />
      <Outlet />
      <Footer />
    </>
  );
};

export default AuthLayout;
