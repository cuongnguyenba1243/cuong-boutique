import menCollection from "../../assets/mencollection.jpg";
import womenCollection from "../../assets/womencollection.jpg";
import { Link } from "react-router-dom";
import path from "../../utilities/path";

const GenderCollection = () => {
  return (
    <section className="px-4 py-6 lg:px-0">
      <div className="container mx-auto flex flex-col gap-8 md:flex-row">
        {/* Women collection */}
        <div className="relative flex-1">
          <img
            src={womenCollection}
            alt="Women's Collection"
            className="h-[700px] w-full object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              Women's Collection
            </h2>
            <Link to={path.HOME} className="text-gray-900 underline">
              Shop now
            </Link>
          </div>
        </div>

        {/* Men collection */}
        <div className="relative flex-1">
          <img
            src={menCollection}
            alt="Men's Collection"
            className="h-[700px] w-full object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              Men's Collection
            </h2>
            <Link to={path.HOME} className="text-gray-900 underline">
              Shop now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default GenderCollection;
