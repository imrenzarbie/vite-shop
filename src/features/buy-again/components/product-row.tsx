// src/features/buy-again/components/product-table/product-row.tsx
import { Product } from "../types/buy-again.types";
import styles from "./product-row.module.scss";

interface Props {
    product: Product;
    selected: boolean;
    quantity: number;
    onToggle: () => void;
    onQuantity: (q: number) => void;
    onAdd: () => void;
}

const currency = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
});

const ProductRow = ({
    product,
    selected,
    quantity,
    onToggle,
    onQuantity,
    onAdd,
}: Props) => {
    const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        const num = val === "" ? NaN : Number(val);
        onQuantity(Number.isFinite(num) && num >= 1 ? Math.floor(num) : 1);
    };

    return (
        <tr className={styles.row}>
            <td className={styles.cell}>
                {/* Replace with router Link if available */}
                <a href={`/products/${product.id}`}>{product.id}</a>
            </td>
            <td className={styles.cell}>
                <img
                    src={product.imageUrl}
                    alt={product.description || "Product image"}
                    className={styles.image}
                    loading="lazy"
                />
            </td>
            <td className={styles.cell}>{product.description}</td>
            <td className={styles.cell}>
                {product.isBencoBrand ? "Yes" : "No"}
            </td>
            <td className={styles.cell}>
                {product.isOnSpecial ? "Yes" : "No"}
            </td>
            <td className={styles.cell}>{product.lastPurchased ? "✓" : ""}</td>
            <td className={`${styles.cell} ${styles.price}`}>
                {currency.format(product.price)}
            </td>
            <td className={styles.cell}>
                <input type="checkbox" checked={selected} onChange={onToggle} />
            </td>
            <td className={styles.cell}>
                <input
                    type="number"
                    min={1}
                    step={1}
                    inputMode="numeric"
                    value={quantity}
                    onChange={handleQtyChange}
                    className={styles.quantity}
                />
            </td>
            <td className={styles.cell}>
                <button onClick={onAdd} disabled={quantity < 1}>
                    Add to Cart
                </button>
            </td>
        </tr>
    );
};

export default ProductRow;
