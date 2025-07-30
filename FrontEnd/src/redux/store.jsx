import { configureStore } from "@reduxjs/toolkit";
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
import storage from "redux-persist/lib/storage";
 
import carritoReducer from "./carritoSlice";
import authReducer from "./autenticadorSlice";
 
// Persistencia específica para el auth
const persistConfigAuth = {
  key: "auth",
  storage,
  version: 1,
};
 
const authPersistedReducer = persistReducer(persistConfigAuth, authReducer);
 
export const store = configureStore({
  reducer: {
    auth: authPersistedReducer,
    carrito: carritoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
 
export const persistor = persistStore(store);