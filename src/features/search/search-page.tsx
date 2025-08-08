import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Search, ShoppingCart } from "lucide-react";
import { useCartManager } from "./cart/use-cart-manager";
import { ProductList } from "./product/product-list";
import { fetchProducts } from "./services/product.api";
import { CartSidebar } from "@/components";

const PRODUCTS_PER_PAGE = 8;

export function SearchPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { cart } = useCartManager();

    const {
        data: searchResults,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["products", currentPage, searchTerm],
        queryFn: () =>
            fetchProducts({
                page: currentPage,
                limit: PRODUCTS_PER_PAGE,
                search: searchTerm,
            }),
    });

    function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        setCurrentPage(1);
    }

    function handlePreviousPage() {
        setCurrentPage((prev) => Math.max(1, prev - 1));
    }

    function handleNextPage() {
        if (searchResults) {
            setCurrentPage((prev) =>
                Math.min(searchResults.totalPages, prev + 1)
            );
        }
    }

    function handlePageChange(page: number) {
        setCurrentPage(page);
    }

    if (isError) {
        return (
            <div className="text-center py-8">
                <p className="text-red-500">
                    Error loading products:{" "}
                    {error instanceof Error ? error.message : "Unknown error"}
                </p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header with Search and Cart */}
            <div className="mb-8 flex items-center justify-between">
                <form onSubmit={handleSearch} className="flex gap-4 max-w-md">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <Button type="submit">Search</Button>
                </form>

                <Button
                    variant="outline"
                    onClick={() => setIsCartOpen(true)}
                    className="relative">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Cart
                    {cart && cart.totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {cart.totalItems}
                        </span>
                    )}
                </Button>
            </div>

            {isLoading ? (
                <div className="text-center py-8">
                    <p>Loading products...</p>
                </div>
            ) : (
                <>
                    <ProductList products={searchResults?.products || []} />

                    {searchResults && searchResults.totalPages > 1 && (
                        <div className="flex justify-center items-center gap-4 mt-8">
                            <Button
                                variant="outline"
                                onClick={handlePreviousPage}
                                disabled={currentPage === 1}>
                                <ChevronLeft className="h-4 w-4 mr-1" />
                                Previous
                            </Button>

                            <div className="flex items-center gap-2">
                                {Array.from(
                                    { length: searchResults.totalPages },
                                    (_, i) => (
                                        <Button
                                            key={i + 1}
                                            variant={
                                                currentPage === i + 1
                                                    ? "default"
                                                    : "outline"
                                            }
                                            size="sm"
                                            onClick={() =>
                                                handlePageChange(i + 1)
                                            }>
                                            {i + 1}
                                        </Button>
                                    )
                                )}
                            </div>

                            <Button
                                variant="outline"
                                onClick={handleNextPage}
                                disabled={
                                    currentPage === searchResults.totalPages
                                }>
                                Next
                                <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                        </div>
                    )}

                    {searchResults && (
                        <div className="text-center mt-4 text-sm text-gray-500">
                            Showing {searchResults.products.length} of{" "}
                            {searchResults.totalProducts} products (Page{" "}
                            {currentPage} of {searchResults.totalPages})
                        </div>
                    )}
                </>
            )}

            <CartSidebar
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />
        </div>
    );
}
