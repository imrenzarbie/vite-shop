import ProductTable from "./components/product-table";
import SearchBar from "./components/search-bar";
import { useBuyAgain } from "./hooks/use-buy-again";

const BuyAgainPage = () => {
    const {
        products,
        isLoading,
        error,
        search,
        setSearch,
        selected,
        toggle,
        selectAll,
        unselectAll,
        quantities,
        setQuantity,
        addToCart,
    } = useBuyAgain();

    if (isLoading) return <p>Loading…</p>;
    if (error) return <p>Error loading products</p>;

    return (
        <div>
            <h1>Buy Again</h1>
            <SearchBar
                search={search}
                onSearch={setSearch}
                onSelectAll={selectAll}
                onUnselectAll={unselectAll}
                onAddSelected={() => addToCart([...selected])}
            />
            <ProductTable
                products={products}
                selected={selected}
                quantities={quantities}
                onToggle={toggle}
                onQuantity={setQuantity}
                onAdd={(id) => addToCart([id])}
            />
            <p>
                Showing 1 to {products.length} of {products.length} entries
            </p>
        </div>
    );
};

export default BuyAgainPage;
