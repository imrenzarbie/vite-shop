import { createBrowserRouter } from "react-router";
import App from "../App";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
]);

export default routes;
