import { useState, useEffect } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";

const products = {
  name: "Round Taxi Jacket",
  price: 120,
  originalPrice: 150,
  description: "Men's Round Taxi Jacket in Dark Brown",
  brand: "Balenciaga",
  material: "Super-soft lambskin",
  sizes: ["S", "M", "L", "XL"],
  colors: ["Red", "Black"],
  images: [
    {
      url: "https://balenciaga.dam.kering.com/m/172edd180652c349/Medium-830878TSS012150_J.jpg?v=1",
      altText: "Stylish Jacket 1",
    },
    {
      url: "https://balenciaga.dam.kering.com/m/359748e3a38e48e1/Medium-830878TSS012150_H.jpg?v=1",
      altText: "Stylish Jacket 2",
    },
    {
      url: "https://balenciaga.dam.kering.com/m/2f66912f0c48ba1b/Small-830878TSS012150_Y.jpg?v=1",
      altText: "Stylish Jacket 3",
    },
    {
      url: "https://balenciaga.dam.kering.com/m/6f53ff360bf9772a/Medium-830878TSS012150_D.jpg?v=1",
      altText: "Stylish Jacket 4",
    },
  ],
};

const similarProducts = [
  {
    _id: 1,
    name: "Product 1",
    price: 100,
    images: [
      {
        url: "https://balenciaga.dam.kering.com/m/8b7f2a7cbc91449/Small-767877TSVG18704_Y.jpg?v=1",
      },
    ],
  },
  {
    _id: 2,
    name: "Product 2",
    price: 100,
    images: [
      {
        url: "https://balenciaga.dam.kering.com/m/30a5bff6aa241171/Small-744441TRVK21300_Y.jpg?v=1",
      },
    ],
  },
  {
    _id: 3,
    name: "Product 3",
    price: 100,
    images: [
      {
        url: "https://balenciaga.dam.kering.com/m/3ccac790e880a54b/Small-739024TQVQ91073_Y.jpg?v=1",
      },
    ],
  },
  {
    _id: 4,
    name: "Product 4",
    price: 100,
    images: [
      {
        url: "https://balenciaga.dam.kering.com/m/2b882f8948ab756b/Small-783397TSVB53421_Y.jpg?v=1",
      },
    ],
  },
];

const ProductDetails = () => {
  const [mainImage, setMainImage] = useState();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (products?.images?.length > 0) {
      setMainImage(products.images[0].url);
    }
  }, [products]);

  const handleQuantityChange = (action) => {
    if (action === "plus") {
      setQuantity((prev) => prev + 1);
    }

    if (action === "minus" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color before add to cart.", {
        duration: 1000,
      });
      return;
    }

    setIsButtonDisabled(true);

    setTimeout(() => {
      toast.success("Product added to cart!", {
        duration: 1000,
      });
      setIsButtonDisabled(false);
    }, 500);
  };

  return (
    <div className="p-6">
      <div className="mx-auto max-w-6xl rounded-lg bg-white p-8">
        <div className="flex flex-col md:flex-row">
          {/* Left thumbnail */}
          <div className="mr-6 hidden flex-col space-y-4 md:flex">
            {products.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`}
                className={`h-20 w-20 cursor-pointer rounded-lg border object-cover ${mainImage === image.url ? "border-black" : "border-gray-300"}`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="md:w-1/2">
            <div className="mb-4">
              <img
                src={mainImage}
                alt="Main Product"
                className="h-auto w-full rounded-lg border border-gray-300 object-cover"
              />
            </div>
          </div>

          {/* Mobile thumbnail */}
          <div className="overscroll-x-scroll mb-4 flex space-x-4 md:hidden">
            {products.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`}
                className={`h-20 w-20 cursor-pointer rounded-lg border object-cover ${mainImage === image.url ? "border-black" : "border-gray-300"}`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>

          {/* Right side */}
          <div className="md:ml-10 md:w-1/2">
            <h1 className="mb-2 text-2xl font-semibold md:text-3xl">
              {products.name}
            </h1>
            <p className="mb-1 text-lg text-gray-600 line-through">
              {products.originalPrice && `${products.originalPrice}`}
            </p>
            <p className="mb-2 text-xl text-gray-500">$ {products.price}</p>
            <p className="mb-4 text-gray-600">{products.description}</p>
            <div className="mb-4">
              <p className="text-gray-700">Color: </p>
              <div className="mt-2 flex gap-2">
                {products.colors.map((color, index) => (
                  <button
                    onClick={() => setSelectedColor(color)}
                    key={index}
                    className={`h-8 w-8 rounded-full border ${selectedColor === color ? "border-4 border-black" : "border-gray-300"}`}
                    style={{
                      backgroundColor: color.toLocaleLowerCase(),
                      filter: "brightness(0.5)",
                    }}
                  ></button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-700">Size: </p>
              <div className="mt-2 flex gap-2">
                {products.sizes.map((size, index) => (
                  <button
                    onClick={() => setSelectedSize(size)}
                    key={index}
                    className={`rounded border px-4 py-2 ${selectedSize === size ? "bg-black text-white" : ""}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-grayy-700">Quantity: </p>
              <div className="mt-2 flex items-center space-x-4">
                <button
                  onClick={() => handleQuantityChange("minus")}
                  className="rounded bg-gray-200 px-2 py-1 text-lg"
                >
                  -
                </button>
                <span className="text-lg">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("plus")}
                  className="rounded bg-gray-200 px-2 py-1 text-lg"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className={`mb-4 w-full rounded bg-black px-6 py-2 text-white ${isButtonDisabled ? "cursor-not-allowed opacity-50" : "hover:bg-gray-900"}`}
            >
              {!isButtonDisabled ? "ADD TO CART" : "ADDING..."}
            </button>

            <div className="mt-10 text-gray-700">
              <h3 className="mb-4 text-xl font-bold">Characteristics: </h3>
              <table className="w-full text-left text-sm text-gray-600">
                <tbody>
                  <tr>
                    <td className="py-1">Brand</td>
                    <td className="py-1">{products.brand}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Material</td>
                    <td className="py-1">{products.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-20">
          <h2 className="mb-4 text-center text-2xl font-medium">
            You May Also Like
          </h2>
          <ProductGrid products={similarProducts} />
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
