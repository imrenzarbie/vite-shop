import { useMutation } from "@tanstack/react-query";

import { useCartManager } from "./use-cart-manager";
import { addToCart, updateCartQuantity, removeFromCart } from "../services/api";
import { Product } from "../types/type";

export function useCartActions() {
    const { invalidateCart } = useCartManager();

    const addMutation = useMutation({
        mutationFn: ({
            productId,
            product,
            quantity = 1,
        }: {
            productId: string;
            product: Product;
            quantity?: number;
        }) => addToCart(productId, product, quantity),
        onSuccess: () => {
            invalidateCart();
        },
        onError: (error) => {
            console.error("Failed to add item to cart:", error);
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({
            productId,
            quantity,
        }: {
            productId: string;
            quantity: number;
        }) => updateCartQuantity(productId, quantity),
        onSuccess: () => {
            invalidateCart();
        },
        onError: (error) => {
            console.error("Failed to update cart quantity:", error);
        },
    });

    const removeMutation = useMutation({
        mutationFn: (productId: string) => removeFromCart(productId),
        onSuccess: () => {
            invalidateCart();
        },
        onError: (error) => {
            console.error("Failed to remove item from cart:", error);
        },
    });

    return {
        addToCart: addMutation.mutate,
        updateQuantity: updateMutation.mutate,
        removeFromCart: removeMutation.mutate,
        isAddingToCart: addMutation.isPending,
        isUpdatingQuantity: updateMutation.isPending,
        isRemovingFromCart: removeMutation.isPending,
    };
}
