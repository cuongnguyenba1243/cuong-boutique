import { Link } from "react-router-dom";
import path from "../../utilities/path";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAdminProducts } from "../../store/slice/adminProductSlice";
import {
  fetchAllOrders,
  fetchOrdersPaginate,
  setPage,
} from "../../store/slice/adminOrderSlice";
import ReactPaginate from "react-paginate";
import ClipLoader from "react-spinners/ClipLoader";

const AdminHomePage = () => {
  const dispatch = useDispatch();
  const {
    orders,
    totalSales,
    currentPage,
    totalPages,
    totalOrders,
    loading: ordersLoading,
    error: ordersError,
  } = useSelector((state) => state.adminOrders);

  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.adminProducts);

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrders());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchOrdersPaginate({ page: currentPage + 1, limit: 5 }));
  }, [dispatch, currentPage]);

  const handlePageChange = (e) => {
    dispatch(setPage(e.selected));
  };

  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>
      {productsLoading || ordersLoading ? (
        <div className="absolute left-1/2 top-1/2 flex items-center justify-center">
          <ClipLoader />
        </div>
      ) : productsError ? (
        <p className="text-red-500">Error fetching products: {productsError}</p>
      ) : ordersError ? (
        <p className="text-red-500">Error fetching orders: {ordersError}</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold">Revenue</h2>
            <p className="text-2xl">${totalSales.toFixed(2)}</p>
          </div>
          <div className="rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold">Total Order</h2>
            <p className="text-2xl">{totalOrders}</p>
            <Link
              to={`${path.ORDER_MANAGEMENT}`}
              className="text-blue-500 hover:underline"
            >
              Manage Orders
            </Link>
          </div>
          <div className="rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold">Total Products</h2>
            <p className="text-2xl">{products.length}</p>
            <Link
              to={`${path.PRODUCT_MANAGEMENT}`}
              className="text-blue-500 hover:underline"
            >
              Manage Products
            </Link>
          </div>
        </div>
      )}

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
                    <td className="p-4">${order.totalPrice}</td>
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

      <div className="mt-6">
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName="pagination"
          activeClassName="active"
          forcePage={currentPage}
        />
      </div>
    </div>
  );
};
export default AdminHomePage;
