import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slice/productSlice";
import generalSlice from "./slice/generalSlice";
import userSlice from "./slice/userSlice";
import cartSlice from "./slice/cartSlice";
export const store = configureStore({
  reducer: {
    products: productSlice,
    general: generalSlice,
    user: userSlice,
    cart: cartSlice,
  },
});
