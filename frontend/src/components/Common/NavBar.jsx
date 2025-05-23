import { Link } from "react-router-dom";
import path from "../../utilities/path";
import icons from "../../utilities/icon";
import logo from "../../assets/logo2.png";
import SearchBar from "./SearchBar";
import { useState } from "react";
import CartDrawer from "../Layout/CartDrawer";
import MobileNav from "./MobileNav";
import { useSelector } from "react-redux";

const { HiOutlineUser, HiOutlineShoppingBag, HiBars3BottomRight } = icons;

const NavBar = () => {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const toggleCartDrawer = () => {
    setCartDrawerOpen(!cartDrawerOpen);
  };

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const cartItemCount =
    cart?.products?.reduce((total, product) => total + product.quantity, 0) ||
    0;

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Left */}
        <div>
          <Link to={path.HOME}>
            <img src={logo} alt="" className="h-[60px] w-[60px]" />
          </Link>
        </div>

        {/* Center */}
        <div className="hidden space-x-6 md:flex">
          <Link
            to={`${path.COLLECTIONS}/all?gender=Men`}
            className="text-sm font-medium uppercase text-gray-700 hover:text-black"
          >
            Men
          </Link>
          <Link
            to={`${path.COLLECTIONS}/all?gender=Women`}
            className="text-sm font-medium uppercase text-gray-700 hover:text-black"
          >
            Women
          </Link>
          <Link
            to={`${path.COLLECTIONS}/all?category=Top Wear`}
            className="text-sm font-medium uppercase text-gray-700 hover:text-black"
          >
            Top
          </Link>
          <Link
            to={`${path.COLLECTIONS}/all?category=Bottom Wear`}
            className="text-sm font-medium uppercase text-gray-700 hover:text-black"
          >
            Bottom
          </Link>
          <Link
            to={`${path.COLLECTIONS}/all?category=Accessory`}
            className="text-sm font-medium uppercase text-gray-700 hover:text-black"
          >
            Accessory
          </Link>
          <Link
            to={`${path.COLLECTIONS}/all?category=Sneaker`}
            className="text-sm font-medium uppercase text-gray-700 hover:text-black"
          >
            Sneaker
          </Link>
        </div>

        {/* Right */}
        <div className="flex items-center space-x-4">
          {user && user.role === "admin" && (
            <Link
              to={path.ADMIN}
              className="black rounded bg-black px-2 text-white"
            >
              Admin
            </Link>
          )}

          <Link to={path.PROFILE} className="block hover:text-black md:hidden">
            <HiOutlineUser className="h-6 w-6 text-gray-700" />
          </Link>

          <button
            onClick={toggleCartDrawer}
            className="relative hover:text-black"
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1.5 rounded-full bg-red-500 px-2 py-1 text-xs text-white">
                {cartItemCount}
              </span>
            )}
          </button>

          <div className="overflow-hidden">
            <SearchBar />
          </div>

          <button onClick={toggleNavDrawer} className="md:hidden">
            <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </nav>

      <CartDrawer
        cartDrawerOpen={cartDrawerOpen}
        toggleCartDrawer={toggleCartDrawer}
      />

      <MobileNav
        toggleNavDrawer={toggleNavDrawer}
        navDrawerOpen={navDrawerOpen}
      />
    </>
  );
};
export default NavBar;
