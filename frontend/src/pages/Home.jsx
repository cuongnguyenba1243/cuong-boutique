import Hero from "../components/Layout/Hero";
import BestSeller from "../components/Products/BestSeller";
import GenderCollection from "../components/Products/GenderCollection";
import NewArrivals from "../components/Products/NewArrivals";

const Home = () => {
  return (
    <div>
      <Hero />
      <GenderCollection />
      <NewArrivals />
      <BestSeller />
    </div>
  );
};
export default Home;
