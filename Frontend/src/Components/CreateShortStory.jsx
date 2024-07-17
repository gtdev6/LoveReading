import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import "./CSS/CreateShortStory.css";
// import API from "../Context/axiosSetup.js";
import { toast } from "react-toastify";
import API from "../Context/axiosSetup.js";

export function CreateShortStory() {
        const navigate = useNavigate();
        const queryClient = useQueryClient();
        const [title, setTitle] = useState("");
        const [content, setContent] = useState("");

        // Define the mutation function
        const createShortStoryMutation = useMutation({
                mutationFn: async (newShortStory) =>
                        await API.post(
                                `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/api/v1/shortStories/create`,
                                newShortStory,
                                {
                                        withCredentials: true,
                                },
                        ),
                onSuccess: async () => {
                        await queryClient.invalidateQueries({
                                queryKey: ["shortStories", "profile"],
                                refetchType: "all",
                        });
                        toast.success("Short Story Created Successfully", {
                                style: {
                                        fontSize: "1.6rem",
                                        color: "#76453b",
                                },
                                position: "top-center",
                                autoClose: 1000,
                        });
                        navigate("/myProfile");
                },
                onError: (e) => {
                        console.log(e);
                },
        });

        // Handle form submission
        const handleSubmit = async (event) => {
                event.preventDefault();
                const sTitle = title;
                const sContent = content;

                // Validate input (optional)
                if (!sTitle || !sContent) {
                        // Handle validation error
                        toast.error("Title & Content Required", {
                                style: {
                                        fontSize: "1.6rem",
                                        color: "#76453b",
                                },
                                position: "top-center",
                                autoClose: 1000,
                        });
                        return;
                }

                // console.log("Title, Content", sTitle, sContent);

                // Call the mutation function
                try {
                        await createShortStoryMutation.mutateAsync({
                                title: sTitle,
                                content: sContent,
                        });
                } catch (error) {
                        // Handle error (optional)
                        console.error("Error creating short story:", error);
                }
        };

        return (
                <div className="newShortStoryRootContainer">
                        <div className="newShortStoryWrapper">
                                <form onSubmit={handleSubmit}>
                                        <div className="newStoryFieldWrapper">
                                                <label
                                                        htmlFor="newStoryTitleTextField"
                                                        className="newStoryFieldLabel">
                                                        Story Title
                                                </label>
                                                <input
                                                        type="text"
                                                        id="newStoryTitleTextField"
                                                        name="newStoryTitleTextField"
                                                        placeholder="Short Story Title"
                                                        value={title}
                                                        onChange={(e) =>
                                                                setTitle(
                                                                        e.target
                                                                                .value,
                                                                )
                                                        }
                                                />
                                        </div>
                                        <div className="newStoryFieldWrapper">
                                                <label
                                                        htmlFor="newStoryTitleTextField1"
                                                        className="newStoryFieldLabel">
                                                        Story Content
                                                </label>
                                                <textarea
                                                        id="newStoryTitleTextField1"
                                                        name="newStoryTitleTextField1"
                                                        placeholder="Short Story Content"
                                                        value={content}
                                                        onChange={(e) =>
                                                                setContent(
                                                                        e.target
                                                                                .value,
                                                                )
                                                        }
                                                />
                                        </div>
                                        <div className="newStoryBtnsContainer">
                                                <button
                                                        type="reset"
                                                        className="newStoryCloseBtn"
                                                        onClick={() =>
                                                                navigate(
                                                                        "/myProfile",
                                                                )
                                                        }>
                                                        Close
                                                </button>
                                                <button
                                                        type="submit"
                                                        className="newStorySaveBtn">
                                                        Save
                                                </button>
                                        </div>
                                </form>
                        </div>
                </div>
        );
}
