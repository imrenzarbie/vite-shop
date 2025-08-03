// src/features/purchased/components/PurchasedPage.tsx
import React, { useMemo, useState, useCallback, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import ProductCard from "./components/product-card";
import usePurchasedProducts from "./hooks/use-previously-purchased";

const PurchasedPage: React.FC = () => {
    const { products } = usePurchasedProducts();
    const [activeSection, setActiveSection] = useState<string>("");
    const [loadedYears, setLoadedYears] = useState<Set<string>>(
        new Set(["2025"])
    );
    const [expandedYears, setExpandedYears] = useState<Set<string>>(
        new Set(["2025"])
    );

    const groupedProducts = useMemo(() => {
        const groups: Record<
            string,
            { items: typeof products; months: Record<string, typeof products> }
        > = {};
        products.forEach((product) => {
            const date = new Date(product.purchasedAt);
            const year = date.getFullYear().toString();
            const month = date.toLocaleString("default", { month: "long" });
            const monthYear = `${month} ${year}`;

            if (!groups[year]) {
                groups[year] = { items: [], months: {} };
            }
            groups[year].items.push(product);

            if (!groups[year].months[month]) {
                groups[year].months[month] = [];
            }
            groups[year].months[month].push(product);
        });
        return groups;
    }, [products]);

    const sortedYears = useMemo(() => {
        return Object.entries(groupedProducts).sort(
            ([a], [b]) => parseInt(b) - parseInt(a)
        );
    }, [groupedProducts]);

    const toggleYear = useCallback((year: string) => {
        setExpandedYears((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(year)) {
                newSet.delete(year);
            } else {
                newSet.add(year);
                setLoadedYears((prevLoaded) => new Set(prevLoaded).add(year));
            }
            return newSet;
        });
    }, []);

    const loadYear = useCallback(
        (year: string) => {
            setLoadedYears((prev) => new Set(prev).add(year));
            if (!expandedYears.has(year)) {
                setExpandedYears((prev) => new Set(prev).add(year));
            }
        },
        [expandedYears]
    );

    // Intersection Observer for highlighting active section
    const { ref: topRef } = useInView({
        threshold: 0,
        onChange: (inView) => {
            if (inView) {
                setActiveSection("");
            }
        },
    });

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-20% 0% -80% 0%" }
        );

        const sections = document.querySelectorAll("section[id]");
        sections.forEach((section) => observer.observe(section));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, [groupedProducts]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <div ref={topRef}></div>

      <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Your Purchases
                </h1>
                <p className="text-gray-600 mt-2">
                    Reorder your favorite items or discover new ones
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Timeline */}
                <div className="md:w-1/4 lg:w-1/5">
                    <div className="sticky top-8 bg-white rounded-xl shadow-sm p-6 h-fit">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Timeline
                        </h2>
                        <div className="relative pl-8 border-l-2 border-gray-200">
                            {sortedYears.map(([year, { months }]) => {
                                const sortedMonths = Object.entries(
                                    months
                                ).sort(([, a], [, b]) => {
                                    const dateA = new Date(
                                        `${Object.keys(months).find(
                                            (k) => months[k] === a
                                        )} 1, ${year}`
                                    );
                                    const dateB = new Date(
                                        `${Object.keys(months).find(
                                            (k) => months[k] === b
                                        )} 1, ${year}`
                                    );
                                    return dateB.getTime() - dateA.getTime();
                                });

                const isYearActive = expandedYears.has(year);
                                const yearId = `year-${year}`;

                return (
                                    <React.Fragment key={year}>
                                        <div
                                            className={`mt-6 first:mt-0 cursor-pointer ${
                                                activeSection === yearId
                                                    ? "text-primary font-bold"
                                                    : ""
                                            }`}
                                            onClick={() => toggleYear(year)}>
                                            <div
                                                className={`absolute left-0 top-1 w-3 h-3 rounded-full ${
                                                    activeSection === yearId
                                                        ? "bg-primary"
                                                        : "bg-gray-400"
                                                }`}></div>
                                            <h3 className="font-bold">
                                                {year}
                                            </h3>
                                        </div>

                    {isYearActive && (
                                            <div className="ml-4 mt-3 space-y-2">
                                                {sortedMonths.map(([month]) => {
                                                    const monthId = `${year}-${month}`;
                                                    return (
                                                        <div
                                                            key={month}
                                                            className={`relative cursor-pointer ${
                                                                activeSection ===
                                                                monthId
                                                                    ? "text-primary font-medium"
                                                                    : ""
                                                            }`}
                                                            onClick={() => {
                                                                const element =
                                                                    document.getElementById(
                                                                        monthId
                                                                    );
                                                                if (element) {
                                                                    element.scrollIntoView(
                                                                        {
                                                                            behavior:
                                                                                "smooth",
                                                                        }
                                                                    );
                                                                }
                                                            }}>
                                                            <div
                                                                className={`absolute left-0 top-2 w-2 h-2 rounded-full ${
                                                                    activeSection ===
                                                                    monthId
                                                                        ? "bg-primary"
                                                                        : "bg-gray-300"
                                                                }`}></div>
                                                            <p className="text-gray-700 text-sm pl-4">
                                                                {month}
                                                            </p>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Products */}
                <div className="md:w-3/4 lg:w-4/5">
                    <div className="space-y-12">
                        {sortedYears.map(([year, { months }]) => {
                            if (!loadedYears.has(year)) {
                                return (
                                    <div
                                        key={year}
                                        className="text-center py-12">
                                        <button
                                            onClick={() => loadYear(year)}
                                            className="bg-primary text-white font-semibold py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors">
                                            Load {year} Purchases
                                        </button>
                                    </div>
                                );
                            }

                            const sortedMonths = Object.entries(months).sort(
                                ([, a], [, b]) => {
                                    const dateA = new Date(
                                        `${Object.keys(months).find(
                                            (k) => months[k] === a
                                        )} 1, ${year}`
                                    );
                                    const dateB = new Date(
                                        `${Object.keys(months).find(
                                            (k) => months[k] === b
                                        )} 1, ${year}`
                                    );
                                    return dateB.getTime() - dateA.getTime();
                                }
              );

                            return (
                                <React.Fragment key={year}>
                                    <div
                                        id={`year-${year}`}
                                        className="flex items-center mb-6">
                                        <h2 className="text-2xl font-bold text-gray-900">
                                            {year}
                                        </h2>
                                        <div className="ml-4 h-px flex-1 bg-gray-200"></div>
                                    </div>

                  {expandedYears.has(year) ? (
                                        sortedMonths.map(([month, items]) => (
                                            <section
                                                key={`${year}-${month}`}
                                                id={`${year}-${month}`}>
                                                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                                    {month}
                                                </h3>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                                    {items.map((product) => (
                                                        <ProductCard
                                                            key={product.id}
                                                            product={product}
                                                        />
                                                    ))}
                                                </div>
                                            </section>
                                        ))
                                    ) : (
                                        <div className="text-center py-6">
                                            <button
                                                onClick={() =>
                                                    setExpandedYears((prev) =>
                                                        new Set(prev).add(year)
                                                    )
                                                }
                                                className="text-primary font-medium hover:underline">
                                                Show {year} purchases
                                            </button>
                                        </div>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>

                    <div className="mt-12 bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white">
                        <div className="max-w-3xl">
                            <h2 className="text-2xl font-bold">
                                Love your purchases?
                            </h2>
                            <p className="mt-2 opacity-90">
                                Share your experience and help others discover
                                great products
                            </p>
                            <button className="mt-4 bg-white text-primary font-semibold py-2 px-6 rounded-lg hover:bg-gray-100 transition-colors">
                                Write a Review
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PurchasedPage;
