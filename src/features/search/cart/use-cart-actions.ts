import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
    addToCart,
    updateCartQuantity,
    removeFromCart,
} from "../services/cart.api";
import { Cart, CartItem, Product } from "../types/type";

const CART_QUERY_KEY = ["cart"];

export function useCartActions() {
    const queryClient = useQueryClient();

    // Optimistic update helper
    const updateCartOptimistically = (updater: (cart: Cart) => Cart) => {
        queryClient.setQueryData(
            CART_QUERY_KEY,
            (oldCart: Cart | undefined) => {
                if (!oldCart) return oldCart;
                return updater(oldCart);
            }
        );
    };

    // Calculate cart totals
    const calculateTotals = (items: CartItem[]) => {
        const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = items.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
        );
        return { totalItems, totalPrice };
    };

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
        onMutate: async ({ productId, product, quantity = 1 }) => {
            // Cancel any outgoing refetches
            await queryClient.cancelQueries({ queryKey: CART_QUERY_KEY });

            // Snapshot the previous value
            const previousCart = queryClient.getQueryData<Cart>(CART_QUERY_KEY);

            // Optimistically update to the new value
            updateCartOptimistically((cart) => {
                const existingItemIndex = cart.items.findIndex(
                    (item) => item.productId === productId
                );

                const newItems = [...cart.items];
                if (existingItemIndex >= 0) {
                    newItems[existingItemIndex] = {
                        ...newItems[existingItemIndex],
                        quantity:
                            newItems[existingItemIndex].quantity + quantity,
                    };
                } else {
                    newItems.push({ productId, quantity, product });
                }

                const totals = calculateTotals(newItems);
                return {
                    ...cart,
                    items: newItems,
                    ...totals,
                };
            });

            return { previousCart };
        },
        onError: (err, variables, context) => {
            // Rollback on error
            if (context?.previousCart) {
                queryClient.setQueryData(CART_QUERY_KEY, context.previousCart);
            }
            console.error("Failed to add item to cart:", err);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
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
        onMutate: async ({ productId, quantity }) => {
            await queryClient.cancelQueries({ queryKey: CART_QUERY_KEY });
            const previousCart = queryClient.getQueryData<Cart>(CART_QUERY_KEY);

            updateCartOptimistically((cart) => {
                let newItems = [...cart.items];
                const itemIndex = newItems.findIndex(
                    (item) => item.productId === productId
                );

                if (itemIndex >= 0) {
                    if (quantity <= 0) {
                        newItems.splice(itemIndex, 1);
                    } else {
                        newItems[itemIndex] = {
                            ...newItems[itemIndex],
                            quantity,
                        };
                    }
                }

                const totals = calculateTotals(newItems);
                return {
                    ...cart,
                    items: newItems,
                    ...totals,
                };
            });

            return { previousCart };
        },
        onError: (err, variables, context) => {
            if (context?.previousCart) {
                queryClient.setQueryData(CART_QUERY_KEY, context.previousCart);
            }
            console.error("Failed to update cart quantity:", err);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
        },
    });

    const removeMutation = useMutation({
        mutationFn: (productId: string) => removeFromCart(productId),
        onMutate: async (productId) => {
            await queryClient.cancelQueries({ queryKey: CART_QUERY_KEY });
            const previousCart = queryClient.getQueryData<Cart>(CART_QUERY_KEY);

            updateCartOptimistically((cart) => {
                const newItems = cart.items.filter(
                    (item) => item.productId !== productId
                );
                const totals = calculateTotals(newItems);
                return {
                    ...cart,
                    items: newItems,
                    ...totals,
                };
            });

            return { previousCart };
        },
        onError: (err, variables, context) => {
            if (context?.previousCart) {
                queryClient.setQueryData(CART_QUERY_KEY, context.previousCart);
            }
            console.error("Failed to remove item from cart:", err);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
        },
    });

    return {
        addToCart: addMutation.mutate,
        updateQuantityImmediate: updateMutation.mutate,
        removeFromCart: removeMutation.mutate,
        isAddingToCart: addMutation.isPending,
        isUpdatingQuantity: updateMutation.isPending,
        isRemovingFromCart: removeMutation.isPending,
    };
}
