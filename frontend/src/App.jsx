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

const App = () => {
  return (
    <Routes>
      <Route path={path.HOME} element={<UserLayout />}>
        <Route path={path.HOME} element={<Home />} />
        <Route path={path.PROFILE} element={<Profile />} />
        <Route path={path.COLLECTIONS} element={<Collections />} />
        <Route path={path.PRODUCT_DETAILS} element={<ProductDetails />} />
        <Route path={path.CHECKOUT} element={<Checkout />} />
      </Route>

      <Route path={path.LOGIN} element={<Login />} />
      <Route path={path.REGISTER} element={<Register />} />
    </Routes>
  );
};
export default App;
