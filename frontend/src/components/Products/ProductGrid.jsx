import { Link } from "react-router-dom";

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product, index) => (
        <Link key={index} to={`/product/${product._id}`} className="block">
          <div className="space-x-3 rounded-lg border border-gray-300 bg-white">
            <div className="mb-4 h-96 w-full">
              <img
                src={product.images[0].url}
                alt={product.name}
                className="h-full w-full rounded-lg object-cover p-3"
              />
            </div>
            <h3 className="mb-2 text-sm">{product.name}</h3>
            <p className="text-sm font-medium tracking-tighter text-gray-500">
              $ {product.price}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};
export default ProductGrid;
