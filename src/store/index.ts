import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import categories from "./categories/categoriesSlice";
import products from "./products/productsSlice";
import cart from "./cart/cartSlice";
import storage from "redux-persist/lib/storage";
import wishlist from "./wishlist/wishlistSlice";
import auth from "./auth/authSlice";

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart"],
}

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["accessToken", "user"],
}

const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["items"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  categories,
  products,
  cart: persistReducer(cartPersistConfig, cart),
  wishlist,
});

const persistedReducer =  persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>; // ? Infers the type of the entire Redux store state (e.g., categories, products, etc.).
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch; // ? Infers the type of the store's dispatch function, ensuring correct typing for actions and thunks when dispatching them.
const persistor = persistStore(store);
export { store, persistor };
