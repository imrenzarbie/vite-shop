// src/features/catalog/reducer.ts
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../types/cart-item.type";
import { RootState } from "@/stores/store";

export interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (
            state,
            action: PayloadAction<
                Omit<CartItem, "quantity"> & { quantity?: number }
            >
        ) => {
            const newItemPayload = action.payload;
            const existingItem = state.items.find(
                (item) => item.id === newItemPayload.id
            );

            if (existingItem) {
                existingItem.quantity += newItemPayload.quantity || 1;
            } else {
                state.items.push({
                    ...newItemPayload,
                    quantity: newItemPayload.quantity || 1,
                });
            }
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
        },
        updateItemQuantity: (
            state,
            action: PayloadAction<{ itemId: string; quantity: number }>
        ) => {
            const { itemId, quantity } = action.payload;
            const itemToUpdate = state.items.find((item) => item.id === itemId);
            if (itemToUpdate) {
                if (quantity <= 0) {
                    state.items = state.items.filter(
                        (item) => item.id !== itemId
                    );
                } else {
                    itemToUpdate.quantity = quantity;
                }
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addItem, removeItem, updateItemQuantity, clearCart } =
    cartSlice.actions;

const selectCartSlice = (state: RootState) => state.cart;

export const selectCartItems = createSelector(
    [selectCartSlice],
    (cartState) => cartState.items as ReadonlyArray<CartItem>
);

export const selectCartTotalItems = createSelector([selectCartItems], (items) =>
    items.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartTotalPrice = createSelector([selectCartItems], (items) =>
    items.reduce((total, item) => total + item.price * item.quantity, 0)
);

export const selectItemInCart = (itemId: string) =>
    createSelector([selectCartItems], (items) =>
        items.find((item) => item.id === itemId)
    );

export default cartSlice.reducer;
