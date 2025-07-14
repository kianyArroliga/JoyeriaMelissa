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

const configuracionPersistencia = {
  key: "root",
  version: 1,
  storage,
};

const reducerPersistente = persistReducer(configuracionPersistencia, carritoReducer);

export const store = configureStore({
  reducer: { carrito: reducerPersistente },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
