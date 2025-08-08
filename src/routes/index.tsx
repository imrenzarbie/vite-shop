import { createBrowserRouter } from "react-router";
import Layout from "../layout";
import CatalogPage from "../features/catalog/catalog";
import PreviouslyPurchasedPage from "@/features/previously-purchased/previously-purchaed-page";
import { SearchPage } from "@/features/search/search-page";

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
                element: <PreviouslyPurchasedPage />,
            },
            {
                path: "search",
                element: <SearchPage />,
            },
        ],
    },
]);

export default routes;
