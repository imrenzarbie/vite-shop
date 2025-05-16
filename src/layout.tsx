import { useState } from "react";
import { Outlet } from "react-router";
import { CartSidebar, Header } from "./components";
import { ScrollArea } from "./components/ui/scroll-area";

interface CartItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
}

const Layout = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([
        { id: "1", name: "Cool T-Shirt", quantity: 1, price: 25.99 },
        { id: "2", name: "Awesome Mug", quantity: 2, price: 12.5 },
    ]);

    const cartItemCount = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    return (
        <div className="flex h-screen flex-col bg-background">
            <Header cartItemCount={cartItemCount} />
            <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
                <main className="flex-1 order-1 md:order-1 overflow-hidden">
                    <ScrollArea className="h-full p-4 md:p-6">
                        <Outlet />
                    </ScrollArea>
                </main>

                <div className="order-2 md:order-2 h-full w-full md:w-72 lg:w-80 border-l border-border bg-card flex flex-col overflow-hidden">
                    <CartSidebar cartItems={cartItems} />
                </div>
            </div>
        </div>
    );
};

export default Layout;
