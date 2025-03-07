import { Link } from "react-router-dom";
import path from "../../utilities/path";
import icons from "../../utilities/icon";
import logo from "../../assets/logo2.png";
import SearchBar from "./SearchBar";
import { useState } from "react";
import CartDrawer from "../Layout/CartDrawer";
import MobileNav from "./MobileNav";

const { HiOutlineUser, HiOutlineShoppingBag, HiBars3BottomRight } = icons;

const NavBar = () => {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  const toggleCartDrawer = () => {
    setCartDrawerOpen(!cartDrawerOpen);
  };

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

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
            to={path.COLLECTIONS}
            className="text-sm font-medium uppercase text-gray-700 hover:text-black"
          >
            Men
          </Link>
          <Link
            to={path.COLLECTIONS}
            className="text-sm font-medium uppercase text-gray-700 hover:text-black"
          >
            Women
          </Link>
          <Link
            to={path.COLLECTIONS}
            className="text-sm font-medium uppercase text-gray-700 hover:text-black"
          >
            Top Wear
          </Link>
          <Link
            to={path.COLLECTIONS}
            className="text-sm font-medium uppercase text-gray-700 hover:text-black"
          >
            Bottom Wear
          </Link>
        </div>

        {/* Right */}
        <div className="flex items-center space-x-4">
          <Link to={path.PROFILE} className="hover:text-black">
            <HiOutlineUser className="h-6 w-6 text-gray-700" />
          </Link>

          <button
            onClick={toggleCartDrawer}
            className="relative hover:text-black"
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            <span className="absolute -top-1.5 rounded-full bg-red-500 px-2 py-1 text-xs text-white">
              2
            </span>
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
