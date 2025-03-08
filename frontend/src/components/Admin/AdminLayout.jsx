import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import icons from "../../utilities/icon";

const { FaBars } = icons;

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative flex min-h-screen flex-col md:flex-row">
      {/* Mobile toggle button */}
      <div className="z-20 flex bg-gray-900 p-4 text-white md:hidden">
        <button onClick={toggleSidebar}>
          <FaBars size={24} />
        </button>
        <h1 className="ml-4 text-xl font-medium">Admin Dashboard</h1>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 z-10 bg-black bg-opacity-50 md:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`absolute z-20 min-h-screen w-64 transform bg-gray-900 text-white transition-transform duration-300 md:static md:block md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <AdminSidebar
          setIsSidebarOpen={setIsSidebarOpen}
          isSidebarOpen={isSidebarOpen}
        />
      </div>

      {/* Main content */}
      <div className="flex-grow overflow-auto p-6">
        <Outlet />
      </div>
    </div>
  );
};
export default AdminLayout;
