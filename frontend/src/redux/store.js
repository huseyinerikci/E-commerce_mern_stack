import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slice/productSlice";
import generalSlice from "./slice/generalSlice";
export const store = configureStore({
  reducer: { products: productSlice, general: generalSlice },
});
