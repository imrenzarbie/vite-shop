// src/features/buy-again/hooks/use-buy-again.ts
import { useEffect, useState, useMemo, useCallback } from "react";
import type { Product } from "../types/buy-again.types";
// import { useBuyAgainQuery } from '../api/buy-again.queries';

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

export const useBuyAgain = () => {
    // const { data = [], isLoading, error } = useBuyAgainQuery();
    const [data, setData] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const error = null as unknown as Error | null;

    useEffect(() => {
        const t = setTimeout(() => {
            setData(mockData);
            setIsLoading(false);
        }, 300);
        return () => clearTimeout(t);
    }, []);

    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [quantities, setQuantities] = useState<Record<string, number>>({});

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return data;
        return data.filter((p) => p.description.toLowerCase().includes(q));
    }, [data, search]);

    const toggle = useCallback((id: string) => {
        setSelected((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    }, []);

    const selectAll = useCallback(() => {
        setSelected(new Set(filtered.map((p) => p.id)));
    }, [filtered]);

    const unselectAll = useCallback(() => {
        setSelected(new Set());
    }, []);

    const setQuantity = useCallback((id: string, qty: number) => {
        const safe = Number.isFinite(qty) && qty >= 1 ? Math.floor(qty) : 1;
        setQuantities((q) => ({ ...q, [id]: safe }));
    }, []);

    const addToCart = useCallback(
        (ids: string[]) => {
            const items = ids.map((id) => ({
                id,
                qty: quantities[id] ?? 1,
            }));
            // demo only
            console.log("Adding to cart", items);
        },
        [quantities]
    );

    return {
        products: filtered,
        isLoading,
        error,
        search,
        setSearch,
        selected,
        toggle,
        selectAll,
        unselectAll,
        quantities,
        setQuantity,
        addToCart,
    };
};
