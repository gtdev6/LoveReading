import { defineConfig } from "vite";
import envPlugin from "@vitejs/plugin-env";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
        plugins: [
                react(),
                envPlugin({
                        // Loads environment variables based on NODE_ENV
                        // For development: loads from .env
                        // For production: loads from .env.production
                        dotenv:
                                ".env" +
                                (process.env.NODE_ENV === "production"
                                        ? ".production"
                                        : ""),
                }),
        ],
});
