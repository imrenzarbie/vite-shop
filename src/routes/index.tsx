import { createBrowserRouter } from "react-router";
import App from "../App";
import Layout from "../layout";
import CatalogPage from "../features/catalog/catalog";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <CatalogPage />,
            },
        ],
    },
]);

export default routes;
