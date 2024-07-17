import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./Context/AuthProvider.jsx";
import { BrowserRouter as Router } from "react-router-dom";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
        <React.StrictMode>
                <Router>
                        <AuthProvider>
                                <QueryClientProvider client={queryClient}>
                                        <ReactQueryDevtools
                                                initialIsOpen={false}
                                        />
                                        <App />
                                </QueryClientProvider>
                        </AuthProvider>
                </Router>
        </React.StrictMode>,
);
