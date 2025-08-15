import { Outlet } from "react-router";
import { Header } from "./components";
import { ScrollArea } from "./components/ui/scroll-area";

const Layout = () => {
    return (
        <div className="flex h-screen flex-col bg-background">
            <Header cartItemCount={5} />
            <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
                <main className="flex-1 order-1 md:order-1 overflow-hidden">
                    <ScrollArea className="h-full p-4 md:p-6">
                        <Outlet />
                    </ScrollArea>
                </main>

                {/* <div className="order-2 md:order-2 h-full w-full md:w-72 lg:w-80 border-l border-border bg-card flex flex-col overflow-hidden">
                    {/* <CartSidebar cartItems={cartItems} />
                </div> */}
            </div>
        </div>
    );
};

export default Layout;
