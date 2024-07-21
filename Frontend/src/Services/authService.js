// src/services/authService.js
import axios from "axios";

export const login = async (credentials) => {
        const API_URL =
                process.env.NODE_ENV === "production"
                        ? `${import.meta.env.VITE_API_URL}/api/v1/users`
                        : `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/api/v1/users`;
        // const response = await axios.get(`${API_URL}/login`, credentials);
        const res = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                        "Content-Type": "application/json",
                },
                body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password,
                }),
        });
        return await res.json();
};

export const signup = async (userData) => {
        const API_URL =
                process.env.NODE_ENV === "production"
                        ? `${import.meta.env.VITE_API_URL}/api/v1/users`
                        : `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/api/v1/users`;
        const response = await axios.post(`${API_URL}/signup`, userData);
        return response.data;
};
