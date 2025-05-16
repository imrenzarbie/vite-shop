import CartItemComponent from "./cart-item";
import { CartItem } from "./types/cart-item.type";

const CartItemList = ({ cartItems }: { cartItems: CartItem[] }) => {
    return (
        <ul className="space-y-4">
            {cartItems.map((item) => (
                <CartItemComponent key={item.id} item={item} />
            ))}
        </ul>
    );
};

export default CartItemList;
