import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../user/userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const userStore = configureStore({
  reducer: { User: persistedReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(userStore);

export type RootState = ReturnType<typeof userStore.getState>;
export type AppDispatch = typeof userStore.dispatch;

