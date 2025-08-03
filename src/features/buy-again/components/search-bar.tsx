interface Props {
    search: string;
    onSearch: (s: string) => void;
    onSelectAll: () => void;
    onUnselectAll: () => void;
    onAddSelected: () => void;
}

const SearchBar = ({
    search,
    onSearch,
    onSelectAll,
    onUnselectAll,
    onAddSelected,
}: Props) => (
    <div className="flex flex-wrap items-center gap-3 mb-6">
        <label className="flex items-center gap-2 text-sm">
            Search:
            <input
                type="text"
                value={search}
                onChange={(e) => onSearch(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-gray-100 focus:border-blue-500 focus:outline-none"
            />
        </label>

        <button
            onClick={onSelectAll}
            className="bg-gray-700 hover:bg-gray-600 text-sm text-gray-100 px-3 py-2 rounded">
            Select All Visible
        </button>

        <button
            onClick={onUnselectAll}
            className="bg-gray-700 hover:bg-gray-600 text-sm text-gray-100 px-3 py-2 rounded">
            Unselect All
        </button>

        <button
            onClick={onAddSelected}
            className="bg-green-600 hover:bg-green-500 text-sm text-white px-3 py-2 rounded">
            Add Selected to Cart
        </button>
    </div>
);

export default SearchBar;
