import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrdersPaginate,
  updateOrderStatus,
  setPage,
} from "../../store/slice/adminOrderSlice";
import ReactPaginate from "react-paginate";
import ClipLoader from "react-spinners/ClipLoader";

const OrderManagement = () => {
  const dispatch = useDispatch();
  const { orders, currentPage, totalPages, loading, error } = useSelector(
    (state) => state.adminOrders,
  );

  useEffect(() => {
    dispatch(fetchOrdersPaginate({ page: currentPage + 1, limit: 5 }));
  }, [dispatch, currentPage]);

  const handlePageChange = (e) => {
    dispatch(setPage(e.selected));
  };

  const handleStatusChange = (orderId, status) => {
    dispatch(updateOrderStatus({ id: orderId, status: status }));
  };

  if (loading)
    return (
      <div className="absolute left-1/2 top-1/2 flex items-center justify-center">
        <ClipLoader />
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mx-auto max-w-7xl p-6">
      <h2 className="mb-6 text-2xl font-bold">Order Management</h2>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <td className="px-4 py-3">Order ID</td>
              <td className="px-4 py-3">Customer</td>
              <td className="px-4 py-3">Total Price</td>
              <td className="px-4 py-3">Status</td>
              <td className="px-4 py-3">Actions</td>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="cursor-pointer border-b hover:bg-gray-50"
                >
                  <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-900">
                    #{order._id}
                  </td>
                  <td className="p-4">{order.user.name}</td>
                  <td className="p-4">${order.totalPrice}</td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="Proccessing">Proccessing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleStatusChange(order._id, "Delivered")}
                      className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                    >
                      Mark as Delivered
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No Orders Found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
export default OrderManagement;
