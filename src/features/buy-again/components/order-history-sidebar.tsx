import { ScrollArea } from "@/components/ui/scroll-area";
import { OrderHistory } from "../utils/product-grouping-util";

interface OrderHistorySidebarProps {
    orderHistory: OrderHistory[];
    activeYear: number | null;
    activeMonth: number | null;
    onMonthClick: (year: number, month: number) => void;
}

export function OrderHistorySidebar({
    orderHistory,
    activeYear,
    activeMonth,
    onMonthClick,
}: OrderHistorySidebarProps): React.ReactElement {
    return (
        // The aside is sticky and aligned to the top of the content area.
        // `self-start` prevents it from stretching vertically in the flex container.
        <aside className="w-full md:w-64 flex-shrink-0 self-start sticky top-6">
            <h2 className="text-xl font-bold mb-4">Order History</h2>
            {/* The ScrollArea has a calculated height to enable internal scrolling */}
            <ScrollArea className="h-[calc(100vh-150px)] pr-4">
                {orderHistory.map((yearData) => (
                    <div key={yearData.year} className="mb-4">
                        <h3
                            className={`font-semibold py-1 ${
                                activeYear === yearData.year
                                    ? "text-primary"
                                    : ""
                            }`}>
                            {yearData.year}
                        </h3>
                        <div className="ml-4 mt-1 space-y-1">
                            {yearData.months.map((month) => (
                                <div
                                    key={month.month}
                                    className={`cursor-pointer pl-3 py-1 rounded ${
                                        activeYear === yearData.year &&
                                        activeMonth === month.month
                                            ? "bg-primary/10 text-primary font-semibold"
                                            : "hover:bg-muted"
                                    }`}
                                    onClick={() =>
                                        onMonthClick(yearData.year, month.month)
                                    }>
                                    {month.name}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </ScrollArea>
        </aside>
    );
}
