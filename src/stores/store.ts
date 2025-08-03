import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "../components/sidebar/reducers/cart-reducer";

export const store = configureStore({
    reducer: {
        cart: cartSliceReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
