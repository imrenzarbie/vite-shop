// src/features/buy-again/api/buy-again.queries.ts
import { useQuery } from "@tanstack/react-query";
import type { Product } from "../types/buy-again.types";

// ------------------------------------------------------------------
// Dummy data – 20 products
// ------------------------------------------------------------------
const DUMMY_PRODUCTS: Product[] = Array.from({ length: 20 }, (_, i) => ({
    id: `P${1000 + i + 1}`,
    description: `Dummy Product ${i + 1} – Lorem ipsum dolor sit amet`,
    imageUrl: `https://picsum.photos/seed/${i}/64`,
    isBencoBrand: i % 3 === 0,
    isOnSpecial: i % 4 === 0,
    lastPurchased:
        i % 5 === 0 ? undefined : `2024-0${(i % 9) + 1}-0${(i % 28) + 1}`,
    price: 5 + i * 0.79,
}));

const fetchBuyAgain = async (): Promise<Product[]> =>
    new Promise((resolve) => setTimeout(() => resolve(DUMMY_PRODUCTS), 300));

export const useBuyAgainQuery = () =>
    useQuery({
        queryKey: ["buy-again"],
        queryFn: fetchBuyAgain,
        staleTime: 1000 * 60 * 5,
    });
