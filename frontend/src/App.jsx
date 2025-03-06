import { Route, Routes } from "react-router-dom";
import { UserLayout } from "./components";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}></Route>
    </Routes>
  );
};
export default App;
