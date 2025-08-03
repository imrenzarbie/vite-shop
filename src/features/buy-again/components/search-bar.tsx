// src/features/buy-again/components/search-bar/search-bar.tsx
import styles from "./search-bar.module.scss";

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
    <div className={styles.bar}>
        <label className={styles.inputWrap} aria-label="Search products">
            <span aria-hidden="true">🔎</span>
            <input
                className={styles.input}
                type="text"
                value={search}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search by description"
            />
        </label>
        <button className={styles.btn} onClick={onSelectAll}>
            Select All Visible
        </button>
        <button className={styles.btn} onClick={onUnselectAll}>
            Unselect All
        </button>
        <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={onAddSelected}>
            Add Selected
        </button>
    </div>
);

export default SearchBar;
