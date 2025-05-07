import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import productsReducer from "./slice/productsSlice";
import cartReducer from "./slice/cartSlice";
import checkoutReducer from "./slice/checkoutSlice";
import ordersReducer from "./slice/orderSlice";
import adminUserReducer from "./slice/adminUserSlice";
import adminProductReducer from "./slice/adminProductSlice";
import adminOrderReducer from "./slice/adminOrderSlice";

//Cấu hình redux-persist
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Cấu hình persist
const rootPersistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth"], // định nghĩa các slice dữ liệu ĐƯỢC PHÉP duy trì qua mỗi lần f5 trình duyệt
  //blacklist: ["auth"], // định nghĩa các slice dữ liệu KHÔNG ĐƯỢC PHÉP duy trì qua mỗi lần f5 trình duyệt
};

const reducers = combineReducers({
  auth: authReducer,
  products: productsReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  orders: ordersReducer,
  adminUsers: adminUserReducer,
  adminProducts: adminProductReducer,
  adminOrders: adminOrderReducer,
});

// Thực hiện persist Reducer
const persistedReducers = persistReducer(rootPersistConfig, reducers);

const store = configureStore({
  reducer: persistedReducers,
  // Fix warning error when implement redux-persist
  // https://stackoverflow.com/a/63244831/8324172
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
