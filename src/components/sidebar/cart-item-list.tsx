import CartItemComponent from "./cart-item";
import { CartItem } from "./types/cart-item.type";

interface CartSidebarProps {
    cartItems: ReadonlyArray<CartItem>;
    onQuantityChange: (itemId: string, newQuantity: number) => void;
}

const CartItemList = ({ cartItems, onQuantityChange }: CartSidebarProps) => {
    return (
        <ul className="space-y-4">
            {cartItems.map((item) => (
                <CartItemComponent
                    key={item.id}
                    item={item}
                    onQuantityChange={onQuantityChange}
                />
            ))}
        </ul>
    );
};

export default CartItemList;
