import { useState } from "react";

const EditProductManagement = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [
      {
        url: "https://balenciaga.dam.kering.com/m/3195308efece0866/Small-8142974E9B31062_Y.jpg?v=2",
      },
      {
        url: "https://balenciaga.dam.kering.com/m/ba35062a6f8572f/Medium-7932814E2B91081_G.jpg?v=1",
      },
    ],
  });

  const handleChange = (e) => {
    setProductData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(productData);
  };

  return (
    <div className="mx-auto max-w-5xl rounded-md p-6 shadow-md">
      <h2 className="mb-6 text-3xl font-bold">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-6">
          <label className="mb-2 block font-semibold">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="mb-2 block font-semibold">Description</label>
          <textarea
            type="text"
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2"
            rows={4}
            required
          />
        </div>

        {/* Price */}
        <div className="mb-6">
          <label className="mb-2 block font-semibold">Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        {/* Count In Stock */}
        <div className="mb-6">
          <label className="mb-2 block font-semibold">Count In Stock</label>
          <input
            type="number"
            name="countInStock"
            value={productData.countInStock}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        {/* SKU */}
        <div className="mb-6">
          <label className="mb-2 block font-semibold">SKU</label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        {/* Sizes */}
        <div className="mb-6">
          <label className="mb-2 block font-semibold">
            Sizes (comma-separated)
          </label>
          <input
            type="text"
            name="sizes"
            value={productData.sizes.join(", ")}
            onChange={(e) =>
              setProductData({
                ...productData,
                sizes: e.target.value.split(",").map((size) => size.trim()),
              })
            }
            className="w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        {/* Colors */}
        <div className="mb-6">
          <label className="mb-2 block font-semibold">
            Colors (comma-separated)
          </label>
          <input
            type="text"
            name="colors"
            value={productData.colors.join(", ")}
            onChange={(e) =>
              setProductData({
                ...productData,
                colors: e.target.value.split(",").map((color) => color.trim()),
              })
            }
            className="w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        {/* Image upload */}
        <div className="mb-6">
          <label className="mb-2 block font-semibold">Upload Image</label>
          <input type="file" onChange={handleImageUpload} />
          <div className="mt-4 flex gap-4">
            {productData.images.map((image, index) => (
              <div key={index} className="">
                <img
                  src={image.url}
                  alt="Product Image"
                  className="h-20 w-20 rounded-md object-cover shadow-md"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-green-500 py-2 text-white transition-colors hover:bg-green-600"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};
export default EditProductManagement;
