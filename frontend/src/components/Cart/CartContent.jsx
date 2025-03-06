import icons from "../../utilities/icon";

const { RiDeleteBin3Line } = icons;

const CartContents = () => {
  const cartProducts = [
    {
      productsId: 1,
      name: "T-Shirt",
      size: "M",
      color: "Red",
      quantity: 1,
      price: 15,
      image: "https://picsum.photos/200?random=1",
    },
    {
      productsId: 2,
      name: "Jeans",
      size: "L",
      color: "Blue",
      quantity: 1,
      price: 25,
      image: "https://picsum.photos/200?random=2",
    },
  ];

  return (
    <div>
      {cartProducts.map((product, index) => (
        <div
          key={index}
          className="flex items-start justify-between border-b py-4"
        >
          <div className="flex items-start">
            <img
              src={product.image}
              alt={product.name}
              className="mr-4 h-24 w-20 rounded object-cover"
            />
            <div>
              <h3>{product.name}</h3>
              <p className="text-sm text-gray-500">
                size: {product.size} | color: {product.color}
              </p>
              <div className="mt-2 flex items-center">
                <button className="rounded border px-2 py-1 text-xl font-medium">
                  -
                </button>
                <span className="mx-4">{product.quantity}</span>
                <button className="rounded border px-2 py-1 text-xl font-medium">
                  +
                </button>
              </div>
            </div>
          </div>
          <div>
            <p>$ {product.price.toLocaleString()}</p>
            <button>
              <RiDeleteBin3Line className="mt-2 h-6 w-6 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default CartContents;
