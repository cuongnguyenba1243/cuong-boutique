import { Route, Routes } from "react-router-dom";
import path from "./utilities/path";
import { UserLayout } from "./components";

const App = () => {
  return (
    <Routes>
      <Route path={path.HOME} element={<UserLayout />}></Route>
    </Routes>
  );
};
export default App;
