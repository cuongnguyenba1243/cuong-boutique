import icons from "../../utilities/icon";

const { HiOutlineShoppingBag, HiArrowPathRoundedSquare, HiOutlineCreditCard } =
  icons;

const FeaturesSection = () => {
  return (
    <section className="bg-white px-4 py-16">
      <div className="container mx-auto grid grid-cols-1 gap-8 text-center md:grid-cols-3">
        {/* Features 1 */}
        <div className="flex flex-col items-center">
          <div className="mb-4 rounded-full p-4">
            <HiOutlineShoppingBag className="text-xl" />
          </div>
          <h4 className="mb-2 tracking-tighter">FREE INTERNATIONAL SHIPPING</h4>
          <p className="text-sm tracking-tighter text-gray-600">
            On all orders over $100.00
          </p>
        </div>

        {/* Features 2 */}
        <div className="flex flex-col items-center">
          <div className="mb-4 rounded-full p-4">
            <HiArrowPathRoundedSquare className="text-xl" />
          </div>
          <h4 className="mb-2 tracking-tighter">30 DAYS RETURN</h4>
          <p className="text-sm tracking-tighter text-gray-600">
            Money back guarantee
          </p>
        </div>

        {/* Features 3 */}
        <div className="flex flex-col items-center">
          <div className="mb-4 rounded-full p-4">
            <HiOutlineCreditCard className="text-xl" />
          </div>
          <h4 className="mb-2 tracking-tighter">SECURE CHECKOUT</h4>
          <p className="text-sm tracking-tighter text-gray-600">
            100% secured checkout process
          </p>
        </div>
      </div>
    </section>
  );
};
export default FeaturesSection;
