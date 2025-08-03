import { createBrowserRouter } from "react-router";
import Layout from "../layout";
import CatalogPage from "../features/catalog/catalog";
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
                path: "previously-purchased",
                element: <PreviouslyPurchasedPage />
            }
        ],
    },
]);

export default routes;
