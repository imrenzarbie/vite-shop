import { Package2, ShoppingCart } from "lucide-react";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface HeaderProps {
    cartItemCount: number;
    onCartClick: () => void;
}

const Header = ({ cartItemCount = 0 }: HeaderProps) => {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="w-full flex h-16 items-center justify-between px-4 md:px-6  ">
                <Link to="/" className="flex items-center gap-2">
                    <Package2 className="h-6 w-6" />
                    <span className="font-bold">MyApp</span>
                </Link>

                <Button
                    variant="outline"
                    size="icon"
                    className="relative"
                    onClick={() => console.log(`shopping cart click`)}
                    aria-label="Open cart">
                    <ShoppingCart className="h-5 w-5" />
                    {cartItemCount > 0 && (
                        <Badge
                            variant="destructive"
                            className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full p-1 text-xs">
                            {cartItemCount}
                        </Badge>
                    )}
                </Button>
            </div>
        </header>
    );
};

export default Header;
