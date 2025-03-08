import path from "../../utilities/path";
import icons from "../../utilities/icon";
import { Link } from "react-router-dom";

const { IoMdClose } = icons;

const MobileNav = ({ navDrawerOpen, toggleNavDrawer }) => {
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
            to={`${path.COLLECTIONS}/all`}
            onClick={toggleNavDrawer}
            className="block text-gray-600 hover:text-black"
          >
            Men
          </Link>
          <Link
            to={`${path.COLLECTIONS}/all`}
            onClick={toggleNavDrawer}
            className="block text-gray-600 hover:text-black"
          >
            Women
          </Link>
          <Link
            to={`${path.COLLECTIONS}/all`}
            onClick={toggleNavDrawer}
            className="block text-gray-600 hover:text-black"
          >
            Top Wear
          </Link>
          <Link
            to={`${path.COLLECTIONS}/all`}
            onClick={toggleNavDrawer}
            className="block text-gray-600 hover:text-black"
          >
            Bottom Wear
          </Link>
        </nav>
      </div>
    </div>
  );
};
export default MobileNav;
