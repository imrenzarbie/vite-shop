// src/features/buy-again/hooks/use-buy-again.ts
import { useState, useMemo } from "react";
import { useBuyAgainQuery } from "./buy-again-queries";

export const useBuyAgain = () => {
    const { data = [], isLoading, error } = useBuyAgainQuery();
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [quantities, setQuantities] = useState<Record<string, number>>({});

    const filtered = useMemo(
        () =>
            data.filter((p) =>
                p.description.toLowerCase().includes(search.toLowerCase())
            ),
        [data, search]
    );

    const toggle = (id: string) =>
        setSelected((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });

    const toggleAll = () =>
        setSelected(
            selected.size === filtered.length
                ? new Set()
                : new Set(filtered.map((p) => p.id))
        );

    const setQuantity = (id: string, qty: number) =>
        setQuantities((q) => ({ ...q, [id]: qty }));

    const addToCart = (ids: string[]) => {
        // TODO: call cart service
        console.log(
            "Adding to cart",
            ids.map((id) => ({ id, qty: quantities[id] ?? 1 }))
        );
    };

    return {
        products: filtered,
        isLoading,
        error,
        search,
        setSearch,
        selected,
        toggle,
        toggleAll,
        quantities,
        setQuantity,
        addToCart,
    };
};
