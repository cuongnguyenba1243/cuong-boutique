import { useEffect } from "react";
import { Link } from "react-router-dom";
import path from "../../utilities/path";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewArrivalsProducts } from "../../store/slice/productsSlice";

const NewArrivals = () => {
  const dispatch = useDispatch();
  const { newArrivals, loading, error } = useSelector(
    (state) => state.products,
  );

  useEffect(() => {
    dispatch(fetchNewArrivalsProducts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="px-4 py-16 lg:px-0">
      <div className="container mx-auto mb-10 text-center">
        <h2 className="mb-4 text-3xl font-bold">Explore New Arrivals</h2>
        <p className="mb-12 text-lg text-gray-600">
          Discover the latest styles straight off the runway, freshly added to
          keep your wardrobe on the cutting edge of fashion.
        </p>
      </div>

      <div
        className={`container mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4`}
      >
        {newArrivals.map((product) => (
          <div
            key={product._id}
            className="relative rounded-md border border-gray-200 shadow-md"
          >
            <img
              src={product.images[0]?.url}
              alt={product.images[0]?.altText || product.name}
              className="h-[500px] w-full rounded-lg object-cover"
              draggable="false"
            />
            <div className="absolute bottom-0 left-0 right-0 h-[108px] rounded-b-lg bg-zinc-600 bg-opacity-50 p-4 text-white backdrop-blur-md">
              <Link to={`/product/${product._id}`} className="block">
                <h4 className="font-medium">{product.name}</h4>
                <p className="mt-1">${product.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-16 flex justify-center">
        <Link
          to={`${path.COLLECTIONS}/all`}
          className="rounded-md bg-black px-4 py-2 text-center text-white hover:bg-gray-700"
        >
          Explore more
        </Link>
      </div>
    </section>
  );
};
export default NewArrivals;
