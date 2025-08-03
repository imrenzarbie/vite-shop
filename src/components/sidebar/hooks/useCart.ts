// src/components/sidebar/hooks/useCartItemQuantityChange.ts
import { useDispatch, useSelector } from "react-redux";
import {
    removeItem,
    selectCartItems,
    updateItemQuantity,
} from "../reducers/cart-reducer";
import { AppDispatch } from "@/stores/store";

const useCart = () => {
    const dispatch = useDispatch<AppDispatch>();
    const cartItems = useSelector(selectCartItems);

    const handleCartItemQuantityChange = (
        itemId: string,
        newQuantity: number
    ) => {
        if (newQuantity <= 0) {
            // If the new quantity is 0 or less, remove the item
            dispatch(removeItem(itemId));
            console.log(`Item removed: ${itemId}`);
        } else {
            // Otherwise, update the item's quantity
            dispatch(updateItemQuantity({ itemId, quantity: newQuantity }));
            console.log(`Item ID: ${itemId}, New Quantity: ${newQuantity}`);
        }
    };

    const handleRemoveItemFromCart = (itemId: string) => {
        dispatch(removeItem(itemId));
        console.log(`Item removed directly: ${itemId}`);
    };

    return {
        cartItems,
        handleCartItemQuantityChange,
        handleRemoveItemFromCart,
    };
};

export default useCart;
