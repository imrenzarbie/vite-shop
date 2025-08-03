import { useState } from "react";
import ProductCard from "./components/product-card";
import { useBuyAgainQuery } from "./hooks/buy-again-queries";

export default function BuyAgainPage() {
    const { data = [], isLoading, error } = useBuyAgainQuery();
    const [search, setSearch] = useState("");

    const filtered = data.filter((p) =>
        p.description.toLowerCase().includes(search.toLowerCase())
    );

    if (isLoading) return <p className="p-4 text-center">Loading…</p>;
    if (error)
        return (
            <p className="p-4 text-center text-red-600">
                Error loading products
            </p>
        );

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-4">
            <h1 className="text-2xl font-bold text-gray-800">Buy Again</h1>

            <input
                type="text"
                placeholder="Search products…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="space-y-4">
                {filtered.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
