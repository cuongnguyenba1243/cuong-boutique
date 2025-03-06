import Hero from "../components/Layout/Hero";
import BestSeller from "../components/Products/BestSeller";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/FeaturesSection";
import GenderCollection from "../components/Products/GenderCollection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";

const Home = () => {
  return (
    <div>
      <Hero />
      <GenderCollection />
      <NewArrivals />
      <BestSeller />

      <h2 className="mb-4 text-center text-3xl font-bold">Recommend for you</h2>
      <ProductDetails />
      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
};
export default Home;
