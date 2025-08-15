import ProductCard from "@/features/catalog/components/product-card";
import { useRef, useEffect } from "react";
import {
    GroupedProduct,
    PurchasedProduct,
} from "../utils/product-grouping-util";

interface ProductGridProps {
    content: GroupedProduct[] | PurchasedProduct[];
    isGrouped: boolean;
    onAddToCart: (product: PurchasedProduct) => void;
    observer: IntersectionObserver | null;
}

export function ProductGrid({
    content,
    isGrouped,
    onAddToCart,
    observer,
}: ProductGridProps): React.ReactElement {
    const groupRefs = useRef<Map<string, HTMLDivElement>>(new Map());

    useEffect(() => {
        if (!observer) return;
        const currentRefs = groupRefs.current;
        currentRefs.forEach((node) => observer.observe(node));
        return () => {
            currentRefs.forEach((node) => observer.unobserve(node));
        };
    }, [content, observer]);

    if (isGrouped) {
        const groupedContent = content as GroupedProduct[];
        return (
            <div className="space-y-8">
                {groupedContent.map((group) => (
                    <section key={`${group.year}-${group.month}`}>
                        <h2
                            id={`group-${group.year}-${group.month}`}
                            data-year={group.year}
                            data-month={group.month}
                            ref={(node) => {
                                const key = `${group.year}-${group.month}`;
                                if (node) groupRefs.current.set(key, node);
                                else groupRefs.current.delete(key);
                            }}
                            // The 'top' value is adjusted to be below the sticky search header.
                            // 7rem (112px) should be enough to clear the search bar area.
                            className="text-xl font-bold mb-4 sticky top-[112px] bg-background py-2 z-0">
                            {group.monthName} {group.year}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {group.products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onAddToCart={() => onAddToCart(product)}
                                />
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        );
    }

    const flatContent = content as PurchasedProduct[];
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {flatContent.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={() => onAddToCart(product)}
                />
            ))}
        </div>
    );
}
