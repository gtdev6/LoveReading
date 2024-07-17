import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const ProtectedRoute = () => {
        const { auth } = useAuth();
        const storedAccessToken = localStorage.getItem("accessToken");

        if (!auth && storedAccessToken) {
                console.log("Hello beauty");
                return <Outlet />;
        }

        if (!auth && !storedAccessToken) {
                return <Navigate to={"/login"} />;
        }

        if (auth && storedAccessToken) {
                return <Outlet />;
        }

        // return auth && auth.accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
