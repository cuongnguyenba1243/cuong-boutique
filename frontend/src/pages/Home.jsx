import Hero from "../components/Layout/Hero";
import BestSeller from "../components/Products/BestSeller";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/FeaturesSection";
import GenderCollection from "../components/Products/GenderCollection";
import NewArrivals from "../components/Products/NewArrivals";

const Home = () => {
  return (
    <div>
      <Hero />
      <GenderCollection />
      <NewArrivals />
      <BestSeller />
      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
};
export default Home;
