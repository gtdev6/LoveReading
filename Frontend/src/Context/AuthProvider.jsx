import { useEffect, useLayoutEffect, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { setupInterceptors } from "../Services/axiosInstance";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setupAxiosInterceptors } from "./axiosSetup.js";

const baseAPIURL =
        process.env.NODE_ENV === "production"
                ? `${import.meta.env.VITE_API_URL}`
                : `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}`;

export const API = axios.create({
        baseURL: baseAPIURL, // Adjust the base URL accordingly
        withCredentials: true, // Allow sending cookies with requests if needed
});

export const AuthProvider = ({ children }) => {
        const [auth, setAuth] = useState(null);
        const navigate = useNavigate();

        useEffect(() => {
                setupAxiosInterceptors({ auth, setAuth, navigate });
        }, []);

        return (
                <AuthContext.Provider value={{ auth, setAuth }}>
                        {children}
                </AuthContext.Provider>
        );
};
