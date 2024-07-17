import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import API from "../Context/axiosSetup.js";
import { toast } from "react-toastify";

// Define the mutation hook
const useApproveBook = () => {
        const queryClient = useQueryClient();

        return useMutation({
                mutationFn: async ({ meetingId, bookId, isSuggestedBook }) => {
                        const response = await API.patch(
                                `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/api/v1/futureMeetings/approveFutureMeetingBook`,
                                {
                                        meetingId,
                                        bookId,
                                        isSuggestedBook,
                                },
                                { withCredentials: true },
                        );
                        return response.data;
                },
                onSuccess: async () => {
                        // Invalidate the futureMeetings query to refresh the data
                        await queryClient.invalidateQueries("futureMeetings");
                        toast.success("Done Successfully", {
                                style: {
                                        fontSize: "2rem",
                                        color: "#76453b",
                                },
                                position: "top-center",
                                autoClose: 500,
                        });
                },
                onError: (error) => {
                        console.log(error);
                },
        });
};

export default useApproveBook;
