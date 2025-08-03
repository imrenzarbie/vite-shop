// src/features/buy-again/components/product-table/product-table.tsx
import { Product } from "../types/buy-again.types";
import ProductRow from "./product-row";
import styles from "./product-table.module.scss";

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
    <div className={styles.wrapper}>
        <div className={styles.scroll}>
            <table className={styles.table}>
                <thead className={styles.thead}>
                    <tr>
                        <th scope="col">Product #</th>
                        <th scope="col">Image</th>
                        <th scope="col">Description</th>
                        <th scope="col">Benco Brands</th>
                        <th scope="col">On Special</th>
                        <th scope="col">Last Purchased</th>
                        <th scope="col">Current Price</th>
                        <th scope="col">Select</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Add</th>
                    </tr>
                </thead>
                <tbody className={styles.tbody}>
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
    </div>
);

export default ProductTable;
