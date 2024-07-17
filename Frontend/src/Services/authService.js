// src/services/authService.js
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/api/v1/users`; // Adjust the API URL as needed

export const login = async (credentials) => {
        // const response = await axios.get(`${API_URL}/login`, credentials);
        const res = await fetch(`${API_URL}/login`, {
                method: "POST",
                credentials: "include", // This ensures cookies are sent with the request
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
        const response = await axios.post(`${API_URL}/signup`, userData);
        return response.data;
};
