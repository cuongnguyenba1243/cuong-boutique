import { Route, Routes } from "react-router-dom";
import { UserLayout } from "./components";
import path from "./utilities/path";

const App = () => {
  return (
    <Routes>
      <Route path={path.HOME} element={<UserLayout />}></Route>
    </Routes>
  );
};
export default App;
