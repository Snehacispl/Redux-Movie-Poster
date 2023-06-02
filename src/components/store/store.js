import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productReducer from "./ProductSlice";
import thunk from "redux-thunk";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    middleware: [thunk],
  },
});

export default store;
