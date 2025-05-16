import { ScrollArea } from "../ui/scroll-area";
import CartItemList from "./cart-item-list";
import CartSummary from "./cart-summary";
import EmptyCartMessage from "./empty-cart";
import useCartItemQuantityChange from "./hooks/useCartItemQuantityChange";
import { CartItem } from "./types/cart-item.type";

interface CartSidebarProps {
    cartItems: CartItem[];
}
const CartSidebar = ({ cartItems }: CartSidebarProps) => {
    const { handleCartItemQuantityChange } = useCartItemQuantityChange();

    const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <aside className="w-full border-l bg-background p-6  md:w-64  lg:w-80 order-1 md:order-2 h-full">
            <div className="flex h-full flex-col">
                <h2 className="mb-4 text-xl font-semibold">Your Cart</h2>
                <ScrollArea className="flex-1">
                    {cartItems.length === 0 ? (
                        <EmptyCartMessage />
                    ) : (
                        <CartItemList
                            cartItems={cartItems}
                            onQuantityChange={handleCartItemQuantityChange}
                        />
                    )}
                </ScrollArea>
                {cartItems.length > 0 && (
                    <CartSummary totalAmount={totalAmount} />
                )}
            </div>
        </aside>
    );
};

export default CartSidebar;
