import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCart } from "../services/api";
const CART_QUERY_KEY = ["cart"];

export function useCartManager() {
    const queryClient = useQueryClient();

    const {
        data: cart,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: CART_QUERY_KEY,
        queryFn: fetchCart,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    const invalidateCart = () => {
        queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    };

    return {
        cart,
        isLoading,
        isError,
        error,
        invalidateCart,
    };
}
