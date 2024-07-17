import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext.js";
import useUser from "../Hooks/useUser.js";
import { Spinner } from "../Util Components/Spinner.jsx";

const LeaderComponent = () => {
        const { auth } = useAuth();
        const { data: user, isLoading, error } = useUser();

        // Render component only if user is authenticated and has 'leader' role
        if (isLoading) {
                return <Spinner />;
        }

        // if (!auth) return <Navigate to={"/login"} />;

        if (user && user.role && user.role !== "Leader") {
                console.log("User !Leader");

                // return (
                //         <div>
                //                 Loading.............................................
                //         </div>
                // );
                return <Navigate to={"/club"} />;
        }

        // if (auth && auth.accessToken && user.role === "Member") {
        //         console.log("User Member");
        //         return <Navigate to={"/club"} />;
        // }

        // Optionally, render something else or nothing if not authorized
        if (user && user.role && user.role === "Leader") return <Outlet />;

        return <Navigate to={"/club"} />;
};

export default LeaderComponent;
