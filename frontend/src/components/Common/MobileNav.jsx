import path from "../../utilities/path";
import icons from "../../utilities/icon";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const { IoMdClose } = icons;

const MobileNav = ({ navDrawerOpen, toggleNavDrawer }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div
      className={`fixed left-0 top-0 z-50 h-full w-3/4 transform bg-white shadow-lg transition-transform duration-300 sm:w-1/2 md:w-1/3 ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="flex justify-end p-4">
        <button onClick={toggleNavDrawer}>
          <IoMdClose className="h-6 w-6 text-gray-600" />
        </button>
      </div>
      <div className="p-4">
        <h2 className="mb-4 text-xl font-semibold">Menu</h2>
        <nav className="space-y-4">
          <Link
            to={`${path.COLLECTIONS}/all?gender=Men`}
            onClick={toggleNavDrawer}
            className="block text-gray-600 hover:text-black"
          >
            Men
          </Link>
          <Link
            to={`${path.COLLECTIONS}/all?gender=Women`}
            onClick={toggleNavDrawer}
            className="block text-gray-600 hover:text-black"
          >
            Women
          </Link>
          <Link
            to={`${path.COLLECTIONS}/all?category=Top Wear`}
            onClick={toggleNavDrawer}
            className="block text-gray-600 hover:text-black"
          >
            Top Wear
          </Link>
          <Link
            to={`${path.COLLECTIONS}/all?category=Bottom Wear`}
            onClick={toggleNavDrawer}
            className="block text-gray-600 hover:text-black"
          >
            Bottom Wear
          </Link>
          <Link
            to={`${path.COLLECTIONS}/all?category=Accessory`}
            onClick={toggleNavDrawer}
            className="block text-gray-600 hover:text-black"
          >
            Accessory
          </Link>
          <Link
            to={`${path.COLLECTIONS}/all?category=Sneaker`}
            onClick={toggleNavDrawer}
            className="block text-gray-600 hover:text-black"
          >
            Sneaker
          </Link>
          {!user && (
            <Link
              to={`${path.LOGIN}`}
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
};
export default MobileNav;
