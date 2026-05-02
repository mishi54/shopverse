import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/auth";
import userReducer from "./slices/User";
const store = configureStore({
    reducer: {
           user: userReducer,
           [authApi.reducerPath]: authApi.reducer,
          
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat([
                  authApi.middleware,
        ]),
});
export default store;