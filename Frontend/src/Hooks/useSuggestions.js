import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import API from "../Context/axiosSetup.js";

// Fetch suggestions
export const useGetSuggestions = () => {
        const queryClient = useQueryClient();
        return useQuery({
                queryKey: ["suggestions"],
                queryFn: async () => {
                        const apiUrl =
                                process.env.NODE_ENV === "production"
                                        ? `${import.meta.env.VITE_API_URL}/api/v1/suggestions`
                                        : `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/api/v1/suggestions`;

                        const { data } = await API.get(apiUrl, {
                                withCredentials: true,
                        });
                        return data.data.suggestions;
                },
                onError: (e) => {
                        console.log(e);
                },
                onSuccess: () => {
                        // queryClient.invalidateQueries({
                        //         queryKey: ["suggestions"]
                        // })
                },
        });
};

// Create a suggestion
export const useCreateSuggestion = () => {
        const queryClient = useQueryClient();
        return useMutation({
                mutationKey: ["createClubSuggestion"],
                mutationFn: async (newSuggestion) => {
                        const apiUrl =
                                process.env.NODE_ENV === "production"
                                        ? `${import.meta.env.VITE_API_URL}/api/v1/suggestions`
                                        : `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/api/v1/suggestions`;

                        const { data } = await API.post(apiUrl, newSuggestion, {
                                withCredentials: true,
                        });
                        return data.data.suggestion;
                },
                onSuccess: async () => {
                        await queryClient.invalidateQueries("suggestions");
                },
        });
};
