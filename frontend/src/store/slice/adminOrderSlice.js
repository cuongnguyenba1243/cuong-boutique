import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authorizeAxiosInstance from "../../utilities/authorizeAxios";

//Fetch all orders by admin
export const fetchAllOrders = createAsyncThunk(
  "adminOrder/fetchAllOrders",
  async () => {
    const response = await authorizeAxiosInstance.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`,
    );

    return response.data;
  },
);

//Fetch all orders by admin and paginate
export const fetchOrdersPaginate = createAsyncThunk(
  "adminOrder/fetchOrdersPaginate",
  async ({ page, limit }) => {
    const response = await authorizeAxiosInstance.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/paginate?page=${page}&limit=${limit}`,
    );

    return response.data;
  },
);

//Update order delivery status
export const updateOrderStatus = createAsyncThunk(
  "adminOrder/updateOrderStatus",
  async ({ id, status }) => {
    const response = await authorizeAxiosInstance.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
      { status },
    );

    return response.data;
  },
);

//Delete an order
export const deleteOrder = createAsyncThunk(
  "adminOrder/deleteOrder",
  async ({ id }) => {
    await authorizeAxiosInstance.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
    );

    return id;
  },
);

//Slice
const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState: {
    orders: [],
    currentPage: 0,
    totalPages: 0,
    totalSales: 0,
    totalOrders: 0,
    loading: false,
    error: null,
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //Fetch all orders
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.totalOrders = action.payload.length;

        const totalSales = action.payload.reduce((acc, order) => {
          return acc + order.totalPrice;
        }, 0);
        state.totalSales = totalSales;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //fetchOrdersPaginate
      .addCase(fetchOrdersPaginate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersPaginate.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchOrdersPaginate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //Update order status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOrder = action.payload;
        const index = state.orders.findIndex(
          (order) => order._id === updatedOrder._id,
        );

        if (index !== -1) {
          state.orders[index] = updatedOrder;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //Delete order
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload,
        );
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setPage } = adminOrderSlice.actions;

export default adminOrderSlice.reducer;
