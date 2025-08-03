import { createBrowserRouter } from "react-router";
import Layout from "../layout";
import CatalogPage from "../features/catalog/catalog";
import BuyAgainPage from "@/features/buy-again/buy-again-page";
import PreviouslyPurchasedPage from "@/features/previously-purchased/previously-purchaed-page";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <CatalogPage />,
            },
            {
                path:"buy-again",
                element: <BuyAgainPage />
            },
            {
                path: "previously-purchased",
                element: <PreviouslyPurchasedPage />
            }
        ],
    },
]);

export default routes;
