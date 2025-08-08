import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useCartActions } from "@/features/search/cart/use-cart-actions";
import { useCartManager } from "@/features/search/cart/use-cart-manager";
import AddToCartButton from "@/features/search/product/add-to-cart-button";
import { X, ShoppingCart } from "lucide-react";

interface SidebarCartProps {
    isOpen: boolean;
    onClose: () => void;
}
const CartSidebar = ({ isOpen, onClose }: SidebarCartProps) => {
    const { cart, isLoading } = useCartManager();
    const { removeFromCart } = useCartActions();

    if (!isOpen) return null;

    function handleRemoveItem(productId: string) {
        removeFromCart(productId);
    }

    return (
        <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />

            {/* Sidebar */}
            <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl">
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b">
                        <div className="flex items-center gap-2">
                            <ShoppingCart className="h-5 w-5" />
                            <h2 className="text-lg font-semibold">
                                Shopping Cart
                            </h2>
                        </div>
                        <Button variant="ghost" size="sm" onClick={onClose}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Total Price */}
                    {cart && cart.items.length > 0 && (
                        <div className="p-4 bg-green-50 border-b">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">
                                    Total:
                                </span>
                                <span className="text-xl font-bold text-green-600">
                                    ${cart.totalPrice.toFixed(2)}
                                </span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                                {cart.totalItems} item
                                {cart.totalItems !== 1 ? "s" : ""}
                            </div>
                        </div>
                    )}

                    {/* Cart Items */}
                    <ScrollArea className="flex-1">
                        {isLoading ? (
                            <div className="p-4 text-center text-gray-500">
                                Loading cart...
                            </div>
                        ) : !cart || cart.items.length === 0 ? (
                            <div className="p-4 text-center text-gray-500">
                                <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                <p>Your cart is empty</p>
                            </div>
                        ) : (
                            <div className="p-4 space-y-4">
                                {cart.items.map((item, index) => (
                                    <div key={item.productId}>
                                        <div className="flex gap-3">
                                            <img
                                                src={item.product.imageUrl}
                                                alt={item.product.name}
                                                className="w-16 h-16 object-cover rounded-md"
                                            />

                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-medium text-sm leading-tight mb-1">
                                                    {item.product.name}
                                                </h3>
                                                <p className="text-sm text-green-600 font-semibold mb-2">
                                                    \( \$
                                                    {item.product.price.toFixed(
                                                        2
                                                    )}{" "}
                                                    \)
                                                </p>

                                                <div className="flex items-center justify-between">
                                                    <AddToCartButton
                                                        product={item.product}
                                                        variant="compact"
                                                    />

                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            handleRemoveItem(
                                                                item.productId
                                                            )
                                                        }
                                                        className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                                        <X className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>

                                        {index < cart.items.length - 1 && (
                                            <Separator className="mt-4" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </ScrollArea>

                    {/* Footer */}
                    {cart && cart.items.length > 0 && (
                        <div className="p-4 border-t">
                            <Button className="w-full" size="lg">
                                Proceed to Checkout
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartSidebar;
