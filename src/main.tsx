import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import routes from "./routes/index.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@imrenzarbie/component-library/dist/component-library.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={routes} />
        </QueryClientProvider>
    </StrictMode>
);
