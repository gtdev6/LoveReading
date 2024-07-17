import { defineConfig } from "vite";
// import envPlugin from "@vitejs/plugin-env";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
        plugins: [react()],
});
