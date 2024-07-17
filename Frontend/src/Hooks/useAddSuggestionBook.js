import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import API from "../Context/axiosSetup.js";
import { toast } from "react-toastify";

// Define the mutation function
const addSuggestion = async ({ bookName, meetingId }) => {
        console.log(bookName, meetingId);

        const response = await API.patch(
                `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/api/v1/futureMeetings/addSuggestion`,
                { bookName, meetingId },
                { withCredentials: true },
        );
        return response.data;
};

// Create the custom hook
const useAddSuggestionBook = () => {
        const queryClient = useQueryClient();

        return useMutation({
                mutationFn: addSuggestion,
                // On success, invalidate the futureMeetings query to refresh the data
                onSuccess: () => {
                        queryClient.invalidateQueries(["futureMeetings"]);
                        toast.success("Book Added", {
                                style: {
                                        fontSize: "2rem",
                                        color: "#76453b",
                                },
                                position: "top-center",
                                autoClose: 500,
                        });
                },
                onError: (error) => {
                        // Optionally handle error
                        console.error("Error adding suggestion:", error);
                },
        });
};

export default useAddSuggestionBook;
