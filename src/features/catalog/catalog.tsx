import { useState } from "react";
import {
    PaginationItem,
    PaginationLink,
    PaginationEllipsis,
    Pagination,
    PaginationContent,
    PaginationPrevious,
    PaginationNext,
} from "../../components/ui/pagination";
import ProductCard, { Product } from "./components/product-card";
import productsData from "./data/products.json";

const ITEMS_PER_PAGE = 9; // Or 6, 12, etc.

const CatalogPage = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(productsData.length / ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentProducts = productsData.slice(startIndex, endIndex);

    const handleAddToCart = (product: Product) => {
        // In a real app, dispatch an action to add to cart state (e.g., in Layout.tsx or global state)
        console.log("Added to cart:", product.name, product.id);
        alert(`${product.name} added to cart! (Check console)`);
        // Example: You might have a function passed from Layout or context:
        // addToCartContext(product, 1);
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo(0, 0); // Scroll to top on page change
        }
    };

    const renderPaginationItems = () => {
        const pageNumbers = [];
        // Logic for displaying page numbers, potentially with ellipsis
        // Simple version: show all pages if few, or a range with ellipsis
        const maxPagesToShow = 5; // Max direct page links shown
        let startPage, endPage;

        if (totalPages <= maxPagesToShow) {
            startPage = 1;
            endPage = totalPages;
        } else {
            const maxPagesBeforeCurrentPage = Math.floor(maxPagesToShow / 2);
            const maxPagesAfterCurrentPage = Math.ceil(maxPagesToShow / 2) - 1;
            if (currentPage <= maxPagesBeforeCurrentPage) {
                startPage = 1;
                endPage = maxPagesToShow;
            } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
                startPage = totalPages - maxPagesToShow + 1;
                endPage = totalPages;
            } else {
                startPage = currentPage - maxPagesBeforeCurrentPage;
                endPage = currentPage + maxPagesAfterCurrentPage;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(i);
                        }}
                        isActive={currentPage === i}
                        size={5}>
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        if (startPage > 1) {
            pageNumbers.unshift(
                <PaginationItem key="start-ellipsis">
                    <PaginationEllipsis />
                </PaginationItem>
            );
            pageNumbers.unshift(
                <PaginationItem key={1}>
                    <PaginationLink
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(1);
                        }}
                        size={5}>
                        1
                    </PaginationLink>
                </PaginationItem>
            );
        }

        if (endPage < totalPages) {
            pageNumbers.push(
                <PaginationItem key="end-ellipsis">
                    <PaginationEllipsis />
                </PaginationItem>
            );
            pageNumbers.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(totalPages);
                        }}
                        size={5}>
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
            );
        }
        return pageNumbers;
    };

    return (
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <h1 className="mb-8 text-center text-3xl font-bold sm:text-4xl">
                Product Catalog
            </h1>
            {currentProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                    {currentProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={handleAddToCart}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-center text-muted-foreground">
                    No products found.
                </p>
            )}

            {totalPages > 1 && (
                <Pagination className="mt-12">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePageChange(currentPage - 1);
                                }}
                                aria-disabled={currentPage === 1}
                                className={
                                    currentPage === 1
                                        ? "pointer-events-none opacity-50"
                                        : undefined
                                }
                                size={5}
                            />
                        </PaginationItem>
                        {renderPaginationItems()}
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePageChange(currentPage + 1);
                                }}
                                aria-disabled={currentPage === totalPages}
                                className={
                                    currentPage === totalPages
                                        ? "pointer-events-none opacity-50"
                                        : undefined
                                }
                                size={5}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
};

export default CatalogPage;
