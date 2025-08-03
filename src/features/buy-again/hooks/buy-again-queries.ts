// src/features/buy-again/api/buy-again.queries.ts
import { useQuery } from "@tanstack/react-query";
import type { Product } from "../types/buy-again.types";

const mockData: Product[] = [
    {
        id: "P-10001",
        description: "Disposable Nitrile Gloves, Medium, Box of 100",
        imageUrl: "https://via.placeholder.com/96x96.png?text=Gloves",
        isBencoBrand: true,
        isOnSpecial: false,
        price: 14.99,
    },
    {
        id: "P-10002",
        description: "Surgical Masks Level 2, Blue, Box of 50",
        imageUrl: "https://via.placeholder.com/96x96.png?text=Masks",
        isBencoBrand: false,
        isOnSpecial: true,
        price: 8.49,
    },
    {
        id: "P-10003",
        description: "Hand Sanitizer 500ml Pump",
        imageUrl: "https://via.placeholder.com/96x96.png?text=Sanitizer",
        isBencoBrand: false,
        isOnSpecial: false,
        price: 5.25,
    },
];

const fetchBuyAgain = async (): Promise<Product[]> =>
    new Promise((resolve) => setTimeout(() => resolve(mockData), 400));

export const useBuyAgainQuery = () =>
    useQuery({
        queryKey: ["buy-again"],
        queryFn: fetchBuyAgain,
        staleTime: 1000 * 60 * 5,
        retry: 0,
        refetchOnWindowFocus: false,
    });
