import { Link } from "react-router-dom";
import path from "../../utilities/path";

const products = [
  {
    _id: 123123,
    name: "T-Shirt",
    price: 110,
    sku: "12321321",
  },
];

const handleDelete = (id) => {
  if (window.confirm("Are you sure you want to delete this product?")) {
    console.log(`Delete product with id: ${id}`);
  }
};

const ProductManagement = () => {
  return (
    <div className="mx-auto max-w-7xl p-6">
      <h2 className="mb-6 text-2xl font-bold">Product Management</h2>

      <Link
        to={`${path.PRODUCT_MANAGEMENT}/${products._id}/new`}
        className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
      >
        Add New Product
      </Link>
      <div className="mt-8 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <td className="px-4 py-3">Name</td>
              <td className="px-4 py-3">Price</td>
              <td className="px-4 py-3">SKU</td>
              <td className="px-4 py-3">Actions</td>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="cursor-pointer border-b hover:bg-gray-50"
                >
                  <td className="whitespace-nowrap p-4 font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="p-4">${product.price}</td>
                  <td className="p-4">{product.sku}</td>
                  <td className="p-4">
                    <Link
                      to={`${path.PRODUCT_MANAGEMENT}/${product._id}/edit`}
                      className="mr-2 rounded bg-yellow-500 px-2 py-1.5 text-white hover:bg-yellow-600"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="rounded bg-red-500 px-2 py-1.5 text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No Product found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ProductManagement;
