import { Link } from "react-router-dom";
import path from "../../utilities/path";

const AdminHomePage = () => {
  const orders = [
    {
      _id: 123213213123,
      user: {
        name: "Mason Nguyen",
      },
      totalPrice: 110,
      status: "Processing",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-semibold">Revenue</h2>
          <p className="text-2xl">$999.999</p>
        </div>
        <div className="rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-semibold">Total Order</h2>
          <p className="text-2xl">312</p>
          <Link
            to={`${path.ORDER_MANAGEMENT}`}
            className="text-blue-500 hover:underline"
          >
            Manage Orders
          </Link>
        </div>
        <div className="rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-semibold">Total Products</h2>
          <p className="text-2xl">654</p>
          <Link
            to={`${path.PRODUCT_MANAGEMENT}`}
            className="text-blue-500 hover:underline"
          >
            Manage Products
          </Link>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="mb-4 text-2xl font-bold">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-gray-500">
            <thead className="bg-gray-100 text-xs uppercase text-gray-700">
              <tr>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Total Price</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="cursor-pointer border-b hover:bg-gray-50"
                  >
                    <td className="p-4">{order._id}</td>
                    <td className="p-4">{order.user.name}</td>
                    <td className="p-4">{order.totalPrice}</td>
                    <td className="p-4">{order.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    No recent orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default AdminHomePage;
