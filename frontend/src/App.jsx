import { Route, Routes } from "react-router-dom";
import path from "./utilities/path";

// User Layout
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
import AccountVerification from "./pages/AccountVerification";

// Admin Layout
import AdminLayout from "./components/Admin/AdminLayout";
import AdminHomePage from "./components/Admin/AdminHomePage";
import UserManagement from "./components/Admin/UserManagement";
import ProductManagement from "./components/Admin/ProductManagement";
import EditProductManagement from "./components/Admin/EditProductManagement";
import AddNewProduct from "./components/Admin/AddNewProduct";
import OrderManagement from "./components/Admin/OrderManagement";

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
        <Route path={path.PRODUCT_MANAGEMENT} element={<ProductManagement />} />
        <Route
          path={`${path.PRODUCT_MANAGEMENT}/:id/edit`}
          element={<EditProductManagement />}
        />
        <Route
          path={`${path.PRODUCT_MANAGEMENT}/:id/new`}
          element={<AddNewProduct />}
        />
        <Route
          path={`${path.ORDER_MANAGEMENT}`}
          element={<OrderManagement />}
        />
      </Route>

      <Route path={path.LOGIN} element={<Login />} />
      <Route path={path.REGISTER} element={<Register />} />
      <Route path={`account/verification`} element={<AccountVerification />} />
    </Routes>
  );
};
export default App;
