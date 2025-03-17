import icons from "../../utilities/icon";
import CartContent from "../Cart/CartContent";
import { useNavigate } from "react-router-dom";
import path from "../../utilities/path";
import { useSelector } from "react-redux";

const { IoMdClose } = icons;

const CartDrawer = ({ cartDrawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user._id : null;

  const handleCheckout = () => {
    toggleCartDrawer();
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate(path.CHECKOUT);
    }
  };

  return (
    <div
      className={`fixed right-0 top-0 z-50 flex h-full w-3/4 transform flex-col bg-white shadow-lg transition-transform duration-300 sm:w-1/2 md:w-1/4 ${cartDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex justify-end p-4">
        <button onClick={toggleCartDrawer}>
          <IoMdClose className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      <div className="flex-grow overflow-y-auto p-4">
        <h2 className="mb-4 text-xl font-semibold">Your Cart</h2>
        {cart && cart?.products?.length > 0 ? (
          <CartContent cart={cart} userId={userId} />
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>

      <div className="sticky bottom-0 bg-white p-4">
        {cart && cart?.products?.length > 0 && (
          <>
            <button
              onClick={handleCheckout}
              className="w-full rounded-lg bg-black py-3 font-semibold text-white hover:bg-gray-700"
            >
              Checkout
            </button>
            <p className="mt-2 text-center text-sm tracking-tighter text-gray-500">
              Shipping, taxes and discount codes caculated at checkout.
            </p>
          </>
        )}
      </div>
    </div>
  );
};
export default CartDrawer;
