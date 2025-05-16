import { useState } from "react";
import { Outlet } from "react-router";
import { CartSidebar, Header } from "./components";

interface CartItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
}

const Layout = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    // Mock cart items - in a real app, this would come from state management
    const [cartItems, setCartItems] = useState<CartItem[]>([
        { id: "1", name: "Cool T-Shirt", quantity: 1, price: 25.99 },
        { id: "2", name: "Awesome Mug", quantity: 2, price: 12.5 },
    ]);

    const cartItemCount = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    return (
        <>
            <div className="flex min-h-screen flex-col">
                <Header
                    cartItemCount={cartItemCount}
                    onCartClick={() => setIsCartOpen(true)}
                />
                <div
                    className="flex flex-row flex-grow
                ">
                    <main className="flex-grow p-4 order-1 md:order-1">
                        <Outlet />
                    </main>
                    <CartSidebar
                        isOpen={isCartOpen}
                        onOpenChange={setIsCartOpen}
                        cartItems={cartItems}
                    />
                </div>
            </div>
        </>
    );
};

export default Layout;
