// src/hooks/useAuth.js
import { useMutation } from "@tanstack/react-query";
import { login, signup } from "../Services/authService.js";

export const useLogin = () => {
        return useMutation({
                mutationKey: ["user"],
                mutationFn: login,
                onSuccess: (data) => {},
                onError: (e) => {
                        console.log(e);
                },
        });

        // return { login, data, isLoading };
};

export const useSignup = () => {
        return useMutation({
                mutationKey: ["user"],
                mutationFn: signup,
                onSuccess: (data) => {},
                onError: (e) => {
                        console.log(e);
                },
        });
};
