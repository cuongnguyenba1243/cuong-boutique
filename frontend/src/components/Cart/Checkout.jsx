import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PayPalButton from "./PayPalButton";

const cart = {
  products: [
    {
      name: "Stylish Jacket",
      size: "M",
      color: "Black",
      price: 120,
      img: "https://balenciaga.dam.kering.com/m/616b3b0a6cf03723/Small-809457TRW775760_X.jpg?v=2",
    },
    {
      name: "Casual Sneaker",
      size: "42",
      color: "White",
      price: 75,
      img: "https://balenciaga.dam.kering.com/m/109a93ab2a6899b0/Small-808489T33361000_X.jpg?v=1",
    },
  ],
  totalPrice: 195,
};

const Checkout = () => {
  const navigate = useNavigate();
  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const handleCreateCheckout = (e) => {
    e.preventDefault();
    setCheckoutId(1);
  };

  const handlePaymentSuccess = (details) => {
    console.log("Payment Successful", details);
    navigate("/");
  };

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-10 tracking-tighter lg:grid-cols-2">
      {/* Left section */}
      <div className="rounded-lg bg-white p-6">
        <h2 className="mb-6 text-3xl font-bold uppercase">Checkout</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className="mb-4 text-lg">Contact Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value="admin@gmail.com"
              className="w-full cursor-not-allowed rounded border p-2"
              disabled
            />
          </div>
          <h3 className="mb-4 text-lg">Delivery</h3>
          {/* Name */}
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstName: e.target.value,
                  })
                }
                className="w-full rounded border p-2"
              />
            </div>
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  })
                }
                className="w-full rounded border p-2"
              />
            </div>
          </div>
          {/* Address */}
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
              className="w-full rounded border p-2"
              required
            />
          </div>
          {/* City & Postal Code */}
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">City</label>
              <input
                required
                type="text"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                className="w-full rounded border p-2"
              />
            </div>
            <div>
              <label className="block text-gray-700">Postal Code</label>
              <input
                required
                type="text"
                value={shippingAddress.postalCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  })
                }
                className="w-full rounded border p-2"
              />
            </div>
          </div>
          {/* Country */}
          <div className="mb-4">
            <label className="block text-gray-700">Country</label>
            <input
              required
              type="text"
              value={shippingAddress.country}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                })
              }
              className="w-full rounded border p-2"
            />
          </div>
          {/* Phone */}
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="tel"
              value={shippingAddress.phone}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value,
                })
              }
              className="w-full rounded border p-2"
              required
            />
          </div>
          <div className="mb-6">
            {!checkoutId ? (
              <button
                type="submit"
                className="w-full rounded bg-black py-3 text-white"
              >
                Continue to payment
              </button>
            ) : (
              <div>
                {/* Paypal */}
                <PayPalButton
                  amount={100}
                  onSuccess={handlePaymentSuccess}
                  onError={() => alert("Payment failed. Please try again.")}
                />
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Right section */}
      <div className="rounded-lg bg-gray-50 p-6">
        <h3 className="mb-4 text-lg">Order Summary</h3>
        <div className="mb-4 border-t py-4">
          {cart.products.map((product, index) => (
            <div
              key={index}
              className="flex items-start justify-between border-b py-2"
            >
              <div className="flex items-start">
                <img
                  src={product.img}
                  alt={product.name}
                  className="mr-4 h-24 w-20 object-cover"
                />
                <div>
                  <h3 className="text-md">{product.name}</h3>
                  <p className="text-gray-500">Size: {product.size}</p>
                  <p className="text-gray-500">Color: {product.color}</p>
                </div>
              </div>
              <p className="text-xl">${product.price?.toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="mb-4 flex items-center justify-between text-lg">
          <p>Subtotal</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
        <div className="flex items-center justify-between text-lg">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="mt-4 flex items-center justify-between border-t pt-4 text-lg">
          <p>Total</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
