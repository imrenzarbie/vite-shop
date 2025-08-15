import { Input } from "@/components/ui/input";
import {
    GroupedProduct,
    PurchasedProduct,
} from "../utils/product-grouping-util";
import { ProductGrid } from "./product-grid";

interface PurchasedProductsContentProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
    content: GroupedProduct[] | PurchasedProduct[];
    isGrouped: boolean;
    onAddToCart: (product: PurchasedProduct) => void;
    observer: IntersectionObserver | null;
}

export function PurchasedProductsContent({
    searchTerm,
    onSearchChange,
    content,
    isGrouped,
    onAddToCart,
    observer,
}: PurchasedProductsContentProps): React.ReactElement {
    return (
        <main className="flex-1">
            {/* This header is now sticky to keep it visible during scroll */}
            <div className="sticky top-0 bg-background z-10 pt-1 pb-4 mb-4 -mt-1">
                <h1 className="text-2xl font-bold mb-4">Buy Again</h1>
                <Input
                    placeholder="Search by product name or number..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="max-w-md"
                />
            </div>

            {content.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No products found</p>
                </div>
            ) : (
                <ProductGrid
                    content={content}
                    isGrouped={isGrouped}
                    onAddToCart={onAddToCart}
                    observer={observer}
                />
            )}
        </main>
    );
}
