import { Route, Routes } from "react-router-dom";
import path from "./utilities/path";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./Pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Collections from "./pages/Collections";
import ProductDetails from "./components/Products/ProductDetails";
import Checkout from "./components/Cart/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminHomePage from "./components/Admin/AdminHomePage";
import UserManagement from "./components/Admin/UserManagement";

const App = () => {
  return (
    <Routes>
      <Route path={path.HOME} element={<UserLayout />}>
        {/* User Layout */}
        <Route path={path.HOME} element={<Home />} />
        <Route path={path.PROFILE} element={<Profile />} />
        <Route path={path.CHECKOUT} element={<Checkout />} />
        <Route path={path.ORDER_CONFIRMATION} element={<OrderConfirmation />} />
        <Route path={path.MY_ORDERS} element={<MyOrders />} />
        <Route path={`${path.ORDER_DETAILS}/:id`} element={<OrderDetails />} />
        <Route
          path={`${path.COLLECTIONS}/:collection`}
          element={<Collections />}
        />
        <Route
          path={`${path.PRODUCT_DETAILS}/:id`}
          element={<ProductDetails />}
        />
      </Route>

      <Route path={path.ADMIN} element={<AdminLayout />}>
        {/* Admin Layout */}
        <Route path={path.ADMIN} element={<AdminHomePage />} />
        <Route path={path.USER_MANAGEMENT} element={<UserManagement />} />
      </Route>

      <Route path={path.LOGIN} element={<Login />} />
      <Route path={path.REGISTER} element={<Register />} />
    </Routes>
  );
};
export default App;
