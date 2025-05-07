import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../store/slice/adminProductSlice";
import path from "../../utilities/path";
// import axios from "axios";
import authorizeAxiosInstance from "../../utilities/authorizeAxios";

const AddNewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    images: [],
    rating: "",
    numView: "",
  });

  const handleChange = (e) => {
    setProductData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const { data } = await authorizeAxiosInstance.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      setProductData((prevData) => ({
        ...prevData,
        images: [...prevData.images, { url: data.imageURL }],
      }));
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(productData));
    navigate(path.PRODUCT_MANAGEMENT);

    setProductData({
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
      images: [],
      rating: "",
      numView: "",
    });
  };

  return (
    <div className="mx-auto max-w-5xl rounded-md p-6 shadow-md">
      <h2 className="mb-6 text-3xl font-bold">Add Product</h2>
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

        {/* Brand */}
        <div className="mb-6">
          <label className="mb-2 block font-semibold">Brand</label>
          <input
            type="text"
            name="brand"
            value={productData.brand}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        {/* Collection */}
        <div className="mb-6">
          <label className="mb-2 block font-semibold">Collection</label>
          <input
            type="text"
            name="collections"
            value={productData.collections}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        {/* Material */}
        <div className="mb-6">
          <label className="mb-2 block font-semibold">Material</label>
          <input
            type="text"
            name="material"
            value={productData.material}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        {/* Gender */}
        <div className="mb-6">
          <label className="mb-2 block font-semibold">Gender</label>
          <select
            name="gender"
            value={productData.gender}
            onChange={handleChange}
            className="w-full rounded border p-2"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
        </div>

        {/* Category */}
        <div className="mb-6">
          <label className="mb-2 block font-semibold">Category</label>
          <select
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="w-full rounded border p-2"
          >
            <option value="Top Wear">Top Wear</option>
            <option value="Bottom Wear">Bottom Wear</option>
            <option value="Accessory">Accessory</option>
            <option value="Sneaker">Sneaker</option>
          </select>
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

        {/* Rating */}
        <div className="mb-6">
          <label className="mb-2 block font-semibold">Rating</label>
          <input
            type="number"
            name="rating"
            value={productData.rating}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        {/* NumView */}
        <div className="mb-6">
          <label className="mb-2 block font-semibold">Num View</label>
          <input
            type="number"
            name="numView"
            value={productData.numView}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        {/* Image upload */}
        <div className="mb-6">
          <label className="mb-2 block font-semibold">Upload Image</label>
          <input type="file" onChange={handleImageUpload} />
          {uploading && <p>Uploading image ...</p>}
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
          Add Product
        </button>
      </form>
    </div>
  );
};
export default AddNewProduct;
