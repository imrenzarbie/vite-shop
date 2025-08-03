import { Product } from "../types/buy-again.types";

interface Props {
    product: Product;
    selected: boolean;
    quantity: number;
    onToggle: () => void;
    onQuantity: (q: number) => void;
    onAdd: () => void;
}

const ProductRow = ({
    product,
    selected,
    quantity,
    onToggle,
    onQuantity,
    onAdd,
}: Props) => (
    <tr className="hover:bg-gray-800">
        <td className="px-3 py-2 border-b border-gray-700">
            <a
                href={`/products/${product.id}`}
                className="text-blue-400 hover:underline">
                {product.id}
            </a>
        </td>
        <td className="px-3 py-2 border-b border-gray-700">
            <img
                src={product.imageUrl}
                alt={product.description}
                className="w-10 h-10 rounded object-cover"
            />
        </td>
        <td className="px-3 py-2 border-b border-gray-700">
            {product.description}
        </td>
        <td className="px-3 py-2 border-b border-gray-700">
            <input
                type="checkbox"
                checked={product.isBencoBrand}
                readOnly
                className="accent-green-500"
            />
        </td>
        <td className="px-3 py-2 border-b border-gray-700">
            <input
                type="checkbox"
                checked={product.isOnSpecial}
                readOnly
                className="accent-green-500"
            />
        </td>
        <td className="px-3 py-2 border-b border-gray-700">
            {product.lastPurchased ? "✓" : ""}
        </td>
        <td className="px-3 py-2 border-b border-gray-700 font-mono font-semibold">
            ${product.price.toFixed(2)}
        </td>
        <td className="px-3 py-2 border-b border-gray-700">
            <input
                type="checkbox"
                checked={selected}
                onChange={onToggle}
                className="accent-blue-500"
            />
        </td>
        <td className="px-3 py-2 border-b border-gray-700">
            <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => onQuantity(Number(e.target.value))}
                className="w-16 bg-gray-800 border border-gray-700 rounded text-center"
            />
        </td>
        <td className="px-3 py-2 border-b border-gray-700">
            <button
                onClick={onAdd}
                className="bg-green-600 hover:bg-green-500 text-white text-xs px-2 py-1 rounded">
                Add
            </button>
        </td>
    </tr>
);

export default ProductRow;
