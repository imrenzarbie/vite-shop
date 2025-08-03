import ProductRow from "./product-row";
import type { Product } from "../types/buy-again.types";

interface Props {
    products: Product[];
    selected: Set<string>;
    quantities: Record<string, number>;
    onToggle: (id: string) => void;
    onQuantity: (id: string, q: number) => void;
    onAdd: (id: string) => void;
}

const ProductTable = ({
    products,
    selected,
    quantities,
    onToggle,
    onQuantity,
    onAdd,
}: Props) => (
    <div className="overflow-x-auto border border-gray-700 rounded-lg bg-gray-900">
        <table className="w-full text-sm text-left text-gray-100">
            <thead className="bg-gray-800 text-xs uppercase tracking-wider">
                <tr>
                    <th className="px-3 py-2">Product #</th>
                    <th className="px-3 py-2">Image</th>
                    <th className="px-3 py-2">Description</th>
                    <th className="px-3 py-2">Benco Brands</th>
                    <th className="px-3 py-2">On Special</th>
                    <th className="px-3 py-2">Last Purchased</th>
                    <th className="px-3 py-2">Current Price</th>
                    <th className="px-3 py-2">Select</th>
                    <th className="px-3 py-2">Qty</th>
                    <th className="px-3 py-2">Add to Cart</th>
                </tr>
            </thead>
            <tbody>
                {products.map((p) => (
                    <ProductRow
                        key={p.id}
                        product={p}
                        selected={selected.has(p.id)}
                        quantity={quantities[p.id] ?? 1}
                        onToggle={() => onToggle(p.id)}
                        onQuantity={(q) => onQuantity(p.id, q)}
                        onAdd={() => onAdd(p.id)}
                    />
                ))}
            </tbody>
        </table>
    </div>
);

export default ProductTable;
