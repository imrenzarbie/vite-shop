import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

// Mock cart item type
interface CartItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
}

interface CartSidebarProps {
    cartItems: CartItem[];
}

const CartSidebar = ({ cartItems }: CartSidebarProps) => {
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
                        <p className="text-center text-muted-foreground">
                            Your cart is empty.
                        </p>
                    ) : (
                        <ul className="space-y-4">
                            {cartItems.map((item) => (
                                <li
                                    key={item.id}
                                    className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">
                                            {item.name}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Quantity: {item.quantity}
                                        </p>
                                    </div>
                                    <p className="font-medium">
                                        $
                                        {(item.price * item.quantity).toFixed(
                                            2
                                        )}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    )}
                </ScrollArea>
                {cartItems.length > 0 && (
                    <div className="mt-6 border-t pt-6">
                        <div className="flex justify-between text-lg font-semibold">
                            <span>Total:</span>
                            <span>${totalAmount.toFixed(2)}</span>
                        </div>
                        <Button type="submit" className="mt-4 w-full">
                            Checkout
                        </Button>
                    </div>
                )}
            </div>
        </aside>
    );
};

export default CartSidebar;
