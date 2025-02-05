import { Outlet } from "react-router-dom";
import Footer from "../components/shared/Footer";
import Header from "../components/shared/Header";
import ScrollToTop from "../components/shared/ScrollToTop";

const MainLayout = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <ScrollToTop/>
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
