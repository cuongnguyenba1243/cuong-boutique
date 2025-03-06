import HeroImage from "../../assets/hero.avif";
import { Link } from "react-router-dom";
import path from "../../utilities/path";

const Hero = () => {
  return (
    <section className="relative">
      <img
        src={HeroImage}
        alt="Hero Image"
        className="h-[400px] w-full object-cover md:h-[600px] lg:h-[700px]"
      />

      <div className="absolute inset-0 mb-8 flex items-end justify-center bg-black bg-opacity-5">
        <div className="p-6 text-center text-white">
          <h1 className="mb-6 text-3xl font-bold uppercase tracking-tighter md:text-9xl">
            Pre-Order
            <br />
            Ready
          </h1>
          <p className="text-md mb-6 md:text-lg">
            BRAND AMBASSADOR FANCLUB SERIES
          </p>
          <Link
            to={path.HOME}
            className="rounded-sm bg-white px-6 py-2 text-lg text-gray-950 hover:bg-gray-200"
          >
            Shop now
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Hero;
