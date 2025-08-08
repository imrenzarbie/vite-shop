import { useMemo } from "react";
import { useCartManager } from "./use-cart-manager";

export function useCartQuantities() {
    const { cart } = useCartManager();

    const quantities = useMemo(() => {
        if (!cart) return {};

        return cart.items.reduce((acc, item) => {
            acc[item.productId] = item.quantity;
            return acc;
        }, {} as Record<string, number>);
    }, [cart]);

    const getQuantity = (productId: string): number => {
        return quantities[productId] || 0;
    };

    const isInCart = (productId: string): boolean => {
        return quantities[productId] > 0;
    };

    return {
        quantities,
        getQuantity,
        isInCart,
    };
}
