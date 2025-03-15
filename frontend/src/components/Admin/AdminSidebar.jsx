import { Link, NavLink, useNavigate } from "react-router-dom";
import icons from "../../utilities/icon";
import path from "../../utilities/path";
import { logout } from "../../store/slice/authSlice";
import { useDispatch } from "react-redux";

const { FaBoxOpen, FaClipboardList, FaStore, FaSignOutAlt, FaUser } = icons;

const AdminSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate(path.LOGIN);
  };

  return (
    <div className="p-6">
      <div className="mb-6 text-center">
        <Link to={path.ADMIN} className="text-2xl font-medium">
          Admin
        </Link>
        <nav className="mt-6 flex flex-col space-y-2">
          {/* Users management */}
          <NavLink
            to={`${path.USER_MANAGEMENT}`}
            className={({ isActive }) =>
              isActive
                ? "flex items-center space-x-2 rounded bg-gray-700 px-4 py-3 text-white"
                : "flex items-center space-x-2 rounded px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white"
            }
          >
            <FaUser />
            <span>Users</span>
          </NavLink>

          {/* Products management */}
          <NavLink
            to={`${path.PRODUCT_MANAGEMENT}`}
            className={({ isActive }) =>
              isActive
                ? "flex items-center space-x-2 rounded bg-gray-700 px-4 py-3 text-white"
                : "flex items-center space-x-2 rounded px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white"
            }
          >
            <FaBoxOpen />
            <span>Products</span>
          </NavLink>

          {/* Orders management */}
          <NavLink
            to={`${path.ORDER_MANAGEMENT}`}
            className={({ isActive }) =>
              isActive
                ? "flex items-center space-x-2 rounded bg-gray-700 px-4 py-3 text-white"
                : "flex items-center space-x-2 rounded px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white"
            }
          >
            <FaClipboardList />
            <span>Orders</span>
          </NavLink>

          {/* Home */}
          <NavLink
            to={path.HOME}
            className={({ isActive }) =>
              isActive
                ? "flex items-center space-x-2 rounded bg-gray-700 px-4 py-3 text-white"
                : "flex items-center space-x-2 rounded px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white"
            }
          >
            <FaStore />
            <span>Shop</span>
          </NavLink>
        </nav>

        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center space-x-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default AdminSidebar;
