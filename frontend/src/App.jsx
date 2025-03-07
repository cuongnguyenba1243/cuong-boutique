import { Route, Routes } from "react-router-dom";
import path from "./utilities/path";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./Pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <Routes>
      <Route path={path.HOME} element={<UserLayout />}>
        <Route path={path.HOME} element={<Home />} />
        <Route path={path.PROFILE} element={<Profile />} />
      </Route>

      <Route path={path.LOGIN} element={<Login />} />
      <Route path={path.REGISTER} element={<Register />} />
    </Routes>
  );
};
export default App;
