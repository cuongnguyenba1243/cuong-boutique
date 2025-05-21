import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authorizeAxiosInstance from "../../utilities/authorizeAxios";

//Fetch cart
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ userId }) => {
    const response = await authorizeAxiosInstance.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
      { params: { userId } },
    );

    return response.data;
  },
);

//Add an item to the cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity, size, color, userId }) => {
    const response = await authorizeAxiosInstance.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
      {
        productId,
        quantity,
        size,
        color,
        userId,
      },
    );

    return response.data;
  },
);

//Update the quantity of an item in the cart
export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ productId, quantity, size, color, userId }) => {
    const response = await authorizeAxiosInstance.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
      {
        productId,
        quantity,
        size,
        color,
        userId,
      },
    );

    return response.data;
  },
);

//Remove an item from the cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId, size, color, userId }) => {
    const response = await authorizeAxiosInstance({
      method: "DELETE",
      url: `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
      data: { productId, userId, size, color },
    });

    return response.data;
  },
);

//Slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cart = { products: null };
    },
  },
  extraReducers: (builder) => {
    builder
      //Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //Add to cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //Update cart quantity
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //Remove from cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
