import { useQuery } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import { OrderHistorySidebar } from "./components/order-history-sidebar";
import { PurchasedProductsContent } from "./components/purchased-products-content";
import { fetchPurchasedProducts } from "./service/buy-again-products.api";
import {
    PurchasedProduct,
    generateOrderHistory,
    GroupedProduct,
    groupProductsByMonth,
} from "./utils/product-grouping-util";

function BuyAgainPage(): React.ReactElement {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeYear, setActiveYear] = useState<number | null>(null);
    const [activeMonth, setActiveMonth] = useState<number | null>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    const {
        data: products = [],
        isLoading,
        error,
    } = useQuery<PurchasedProduct[]>({
        queryKey: ["purchased-products"],
        queryFn: fetchPurchasedProducts,
    });

    // Adjusted IntersectionObserver to work with the main layout's scroll area
    useEffect(() => {
        if (searchTerm) {
            observerRef.current?.disconnect();
            return;
        }

        const callback: IntersectionObserverCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const year = parseInt(
                        entry.target.getAttribute("data-year")!,
                        10
                    );
                    const month = parseInt(
                        entry.target.getAttribute("data-month")!,
                        10
                    );
                    setActiveYear(year);
                    setActiveMonth(month);
                }
            });
        };

        // root: null makes it observe intersections relative to the viewport.
        // rootMargin offsets the "top" of the viewport to account for the sticky
        // app header and the sticky search bar, ensuring highlighting is accurate.
        observerRef.current = new IntersectionObserver(callback, {
            root: null,
            rootMargin: "-50px 0px 0px 0px",
            threshold: 1,
        });

        const currentObserver = observerRef.current;
        return () => currentObserver.disconnect();
    }, [searchTerm]);

    const handleMonthClick = (year: number, month: number) => {
        setSearchTerm("");
        const element = document.getElementById(`group-${year}-${month}`);
        element?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const handleAddToCart = (product: PurchasedProduct) => {
        console.log("Adding to cart:", product);
    };

    const orderHistory = generateOrderHistory(products);
    let content: GroupedProduct[] | PurchasedProduct[] = [];
    let isGrouped = false;

    if (searchTerm) {
        content = products.filter(
            (p) =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
        isGrouped = false;
    } else {
        content = groupProductsByMonth(products);
        isGrouped = true;
    }

    if (isLoading) return <div>Loading...</div>;
    if (error)
        return <div>Error loading products. Please try again later.</div>;

    // The component now renders a simple flex container.
    // The parent Layout component handles height and scrolling.
    return (
        <div className="flex flex-col md:flex-row gap-6">
            <OrderHistorySidebar
                orderHistory={orderHistory}
                activeYear={searchTerm ? null : activeYear}
                activeMonth={searchTerm ? null : activeMonth}
                onMonthClick={handleMonthClick}
            />
            <PurchasedProductsContent
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                content={content}
                isGrouped={isGrouped}
                onAddToCart={handleAddToCart}
                observer={observerRef.current}
            />
        </div>
    );
}

export default BuyAgainPage;
