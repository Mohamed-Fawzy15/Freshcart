import { configureStore } from "@reduxjs/toolkit";
import { tokenReducer } from "./Token/TokenSlice";
import { OrderReducer } from "./Orders/OrderSlice";
import { AddressReducer } from "./Address/AddressSlice";
import { authReducer } from "./Auth/AuthSlice";
import { CartReducer } from "./Cart/CartSlice";
import { WishlistReducer } from "./Wishlist/WishlistSlice";
import { ProductReducer } from "./Products/ProductsSlice";
import { categoriesReducer } from "./Categories/CategoriesSlice";
import { BrandsReducer } from "./Brands/BrandsSlice";

export const Store = configureStore({
  reducer: {
    token: tokenReducer,
    orders: OrderReducer,
    address: AddressReducer,
    auth: authReducer,
    cart: CartReducer,
    wishlist: WishlistReducer,
    products: ProductReducer,
    categories: categoriesReducer,
    brands: BrandsReducer,
  },
});
