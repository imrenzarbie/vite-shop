import { Product } from "@/features/catalog/components/product-card";

export interface PurchasedProduct extends Product {
    purchaseDate: string;
}

export interface OrderHistory {
    year: number;
    months: {
        name: string;
        month: number;
    }[];
}

export interface GroupedProduct {
    year: number;
    month: number;
    monthName: string;
    products: PurchasedProduct[];
}

/**
 * Generates a nested structure of years and months from product data for the sidebar.
 */
export function generateOrderHistory(
    products: PurchasedProduct[]
): OrderHistory[] {
    const historyMap = new Map<number, Set<number>>();

    products.forEach((product) => {
        const date = new Date(product.purchaseDate);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // getMonth() is 0-indexed

        if (!historyMap.has(year)) {
            historyMap.set(year, new Set());
        }
        historyMap.get(year)!.add(month);
    });

    return Array.from(historyMap.entries())
        .map(([year, monthSet]) => ({
            year,
            months: Array.from(monthSet)
                .sort((a, b) => b - a) // Sort months descending
                .map((month) => ({
                    name: new Date(year, month - 1).toLocaleString("default", {
                        month: "long",
                    }),
                    month,
                })),
        }))
        .sort((a, b) => b.year - a.year); // Sort years descending
}

/**
 * Groups a flat list of products by year and month.
 */
export function groupProductsByMonth(
    products: PurchasedProduct[]
): GroupedProduct[] {
    const grouped = products.reduce((acc, product) => {
        const date = new Date(product.purchaseDate);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const key = `${year}-${month}`;

        if (!acc[key]) {
            acc[key] = {
                year,
                month,
                monthName: date.toLocaleString("default", { month: "long" }),
                products: [],
            };
        }
        acc[key].products.push(product);
        return acc;
    }, {} as Record<string, GroupedProduct>);

    return Object.values(grouped).sort((a, b) => {
        if (a.year !== b.year) return b.year - a.year;
        return b.month - a.month;
    });
}
