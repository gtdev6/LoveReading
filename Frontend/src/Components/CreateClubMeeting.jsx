import "./CSS/CreateClubMeeting.css";
import { useNavigate } from "react-router-dom";
import { IconPlus } from "@tabler/icons-react";
import { List } from "@mantine/core";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../Context/axiosSetup.js";
import { toast } from "react-toastify";

export function CreateClubMeeting() {
        const queryClient = useQueryClient();
        const navigate = useNavigate();
        const [booksName, setBooksName] = useState([]);
        const [bookFieldValue, setBookFieldValue] = useState("");
        const [meetingTitle, setMeetingTitle] = useState("");
        const [meetingDesc, setMeetingDesc] = useState("");
        const [meetingDate, setMeetingDate] = useState("");
        const [meetingTime, setMeetingTime] = useState("");
        const [meetingLocation, setMeetingLocation] = useState("");

        const createClubMeeting = async (data) => {
                const { responseData } = await API.post(
                        `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/api/v1/meetings/`,
                        data,
                        {
                                withCredentials: true,
                        },
                );
                return responseData;
        };

        const { mutateAsync } = useMutation({
                mutationFn: createClubMeeting,
                onSuccess: () => {
                        // Invalidate the query to update hasProfile status
                        queryClient.invalidateQueries({
                                queryKey: ["hasProfile", "clubMeetings"],
                                refetchType: "all",
                        });
                        toast.success("Meeting Created Successfully", {
                                style: {
                                        fontSize: "2rem",
                                        color: "#76453b",
                                },
                                position: "top-center",
                                autoClose: 1000,
                        });
                },
                onError: (error) => {
                        console.error("Error creating profile:", error);
                        // Handle error as needed
                },
        });

        async function handleSubmit(e) {
                e.preventDefault();

                const formData = {
                        title: meetingTitle,
                        description: meetingDesc,
                        date: meetingDate,
                        time: meetingTime,
                        location: meetingLocation,
                        books: booksName,
                };

                console.log(formData);

                try {
                        await mutateAsync(formData);
                        navigate("/club");
                } catch (e) {
                        console.log(e);
                }
        }

        return (
                <div className="newClubMeetingRootContainer">
                        <div className="newClubMeetingWrapper">
                                <form action="" onSubmit={handleSubmit}>
                                        <div className="newClubMeetingFieldWrapper">
                                                <label
                                                        htmlFor="newClubMeetingTitleTextField"
                                                        className="newClubMeetingFieldLabel">
                                                        Title
                                                </label>
                                                <input
                                                        type="text"
                                                        id={
                                                                "newClubMeetingTitleTextField"
                                                        }
                                                        name={
                                                                "newClubMeetingTitleTextField"
                                                        }
                                                        placeholder={
                                                                "Meeting Title"
                                                        }
                                                        value={meetingTitle}
                                                        onChange={(e) =>
                                                                setMeetingTitle(
                                                                        e.target
                                                                                .value,
                                                                )
                                                        }
                                                />
                                        </div>
                                        <div className="newClubMeetingFieldWrapper">
                                                <label
                                                        htmlFor="newClubMeetingTitleTextField1"
                                                        className="newClubMeetingFieldLabel">
                                                        Meeting Description
                                                </label>
                                                <textarea
                                                        id={
                                                                "newClubMeetingTitleTextField1"
                                                        }
                                                        name={
                                                                "newClubMeetingTitleTextField1"
                                                        }
                                                        placeholder={
                                                                "Meeting Description"
                                                        }
                                                        value={meetingDesc}
                                                        onChange={(e) =>
                                                                setMeetingDesc(
                                                                        e.target
                                                                                .value,
                                                                )
                                                        }
                                                />
                                        </div>

                                        <div className="newClubMeetingFieldWrapper">
                                                <label
                                                        htmlFor="newClubMeetingBookTextField"
                                                        className="newClubMeetingFieldLabel">
                                                        Meeting Books
                                                </label>
                                                <div className="newClubMeetingBookFieldWrapper">
                                                        <input
                                                                id={
                                                                        "newClubMeetingBookTextField"
                                                                }
                                                                name={
                                                                        "newClubMeetingBookTextField"
                                                                }
                                                                placeholder={
                                                                        "Meeting Book"
                                                                }
                                                                value={
                                                                        bookFieldValue
                                                                }
                                                                onChange={(
                                                                        e,
                                                                ) => {
                                                                        setBookFieldValue(
                                                                                e
                                                                                        .target
                                                                                        .value,
                                                                        );
                                                                }}
                                                        />
                                                        <button
                                                                onClick={(
                                                                        e,
                                                                ) => {
                                                                        e.preventDefault();
                                                                        if (
                                                                                bookFieldValue &&
                                                                                bookFieldValue !==
                                                                                        ""
                                                                        ) {
                                                                                setBooksName(
                                                                                        [
                                                                                                ...booksName,
                                                                                                bookFieldValue,
                                                                                        ],
                                                                                );
                                                                                setBookFieldValue(
                                                                                        "",
                                                                                );
                                                                        }
                                                                }}>
                                                                <IconPlus />
                                                        </button>
                                                </div>
                                                <List className="bookListRoot">
                                                        {booksName.map(
                                                                (
                                                                        book,
                                                                        index,
                                                                ) => (
                                                                        <List.Item
                                                                                className="bookListItem"
                                                                                key={
                                                                                        index
                                                                                }>
                                                                                <p>
                                                                                        <img
                                                                                                src="/Assets/Book.svg"
                                                                                                alt=""
                                                                                        />
                                                                                        {
                                                                                                book
                                                                                        }
                                                                                </p>
                                                                        </List.Item>
                                                                ),
                                                        )}
                                                </List>
                                        </div>

                                        <div className="newClubMeetingFieldWrapper">
                                                <label
                                                        htmlFor="newClubMeetingDateTextField"
                                                        className="newClubMeetingFieldLabel">
                                                        Meeting Date
                                                </label>
                                                <input
                                                        type="Date"
                                                        id={
                                                                "newClubMeetingDateTextField"
                                                        }
                                                        name={
                                                                "newClubMeetingDateTextField"
                                                        }
                                                        placeholder={
                                                                "22/05/2024"
                                                        }
                                                        value={meetingDate}
                                                        onChange={(e) =>
                                                                setMeetingDate(
                                                                        e.target
                                                                                .value,
                                                                )
                                                        }
                                                />
                                        </div>

                                        <div className="newClubMeetingFieldWrapper">
                                                <label
                                                        htmlFor="newClubMeetingTimeTextField"
                                                        className="newClubMeetingFieldLabel">
                                                        Meeting Time
                                                </label>
                                                <input
                                                        type="time"
                                                        id={
                                                                "newClubMeetingTimeTextField"
                                                        }
                                                        name={
                                                                "newClubMeetingTimeTextField"
                                                        }
                                                        value={meetingTime}
                                                        onChange={(e) =>
                                                                setMeetingTime(
                                                                        e.target
                                                                                .value,
                                                                )
                                                        }
                                                />
                                        </div>
                                        <div className="newClubMeetingFieldWrapper">
                                                <label
                                                        htmlFor="newClubMeetingLocationTextField"
                                                        className="newClubMeetingFieldLabel">
                                                        Meeting Location
                                                </label>
                                                <input
                                                        type="Text"
                                                        id={
                                                                "newClubMeetingLocationTextField"
                                                        }
                                                        name={
                                                                "newClubMeetingLocationTextField"
                                                        }
                                                        placeholder={
                                                                "Meeting Location"
                                                        }
                                                        value={meetingLocation}
                                                        onChange={(e) =>
                                                                setMeetingLocation(
                                                                        e.target
                                                                                .value,
                                                                )
                                                        }
                                                />
                                        </div>

                                        <div className="newClubMeetingBtnsContainer">
                                                <button
                                                        type={"reset"}
                                                        className="newClubMeetingCloseBtn"
                                                        onClick={() =>
                                                                navigate(
                                                                        "/club",
                                                                )
                                                        }>
                                                        Close
                                                </button>
                                                <button
                                                        className="newClubMeetingSaveBtn"
                                                        type={"submit"}
                                                        onClick={handleSubmit}>
                                                        Save
                                                </button>
                                        </div>
                                </form>
                        </div>
                </div>
        );
}
