import { useState } from "react";
import type { Product } from "../types/buy-again.types";

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    const [qty, setQty] = useState(1);

    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 space-y-3">
            <div className="flex items-start space-x-3">
                <img
                    src={product.imageUrl}
                    alt={product.description}
                    className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                    <h2 className="font-semibold text-gray-800 text-sm leading-tight">
                        {product.description}
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">#{product.id}</p>
                </div>
            </div>

            <div className="flex justify-between items-center text-sm">
                <span className="font-mono font-semibold text-green-600">
                    ${product.price.toFixed(2)}
                </span>
                <div className="flex items-center space-x-2">
                    <label className="text-xs text-gray-600">Qty</label>
                    <input
                        type="number"
                        min="1"
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                        className="w-12 text-center border border-gray-300 rounded"
                    />
                </div>
            </div>

            <button
                onClick={() => console.log("Add to cart", product.id, qty)}
                className="w-full bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700 transition">
                Add to Cart
            </button>
        </div>
    );
}
