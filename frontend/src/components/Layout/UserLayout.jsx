import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      Content
      <Footer />
    </div>
  );
};
export default UserLayout;
