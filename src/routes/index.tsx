import { createBrowserRouter } from "react-router";
import Layout from "../layout";
import CatalogPage from "../features/catalog/catalog";
import BuyAgainPageV2 from "@/features/buy-again-v2/buy-again-page";
import BuyAgainPage from "@/features/buy-again/buy-again-page";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <BuyAgainPage />,
            },
            {
                path: "catalog",
                element: <CatalogPage />,
            },
            {
                path: "buy-again",
                element: <BuyAgainPage />,
            },
        ],
    },
]);

export default routes;
