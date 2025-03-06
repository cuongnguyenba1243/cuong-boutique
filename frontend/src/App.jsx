import { Route, Routes } from "react-router-dom";
import path from "./utilities/path";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./Pages/Home";

const App = () => {
  return (
    <Routes>
      <Route path={path.HOME} element={<UserLayout />}>
        <Route path={path.HOME} element={<Home />} />
      </Route>
    </Routes>
  );
};
export default App;
