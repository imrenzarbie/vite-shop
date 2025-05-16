import { createBrowserRouter } from "react-router";
import App from "../App";
import Layout from "../layout";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <App />,
            },
        ],
    },
]);

export default routes;
