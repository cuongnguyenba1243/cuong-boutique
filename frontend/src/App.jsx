import { Route, Routes } from "react-router-dom";
import path from "./utilities/path";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./Pages/Home";
import Login from "./pages/Login";

const App = () => {
  return (
    <Routes>
      <Route path={path.HOME} element={<UserLayout />}>
        <Route path={path.HOME} element={<Home />} />
      </Route>

      <Route path={path.LOGIN} element={<Login />} />
    </Routes>
  );
};
export default App;
