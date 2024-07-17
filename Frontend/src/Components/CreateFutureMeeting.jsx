import "./CSS/CreateFutureMeeting.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import { List } from "@mantine/core";
import { useCreateFutureMeeting } from "../Hooks/useCreateFutureMeeting.js";
import { toast } from "react-toastify";

export function CreateFutureMeeting() {
        const navigate = useNavigate();
        const [meetingTitle, setMeetingTitle] = useState("");
        const [meetingDate, setMeetingDate] = useState("");
        const [booksName, setBooksName] = useState([]);
        const [bookFieldValue, setBookFieldValue] = useState("");
        const {
                mutate: createFutureMeeting,
                isLoading,
                isError,
                isSuccess,
        } = useCreateFutureMeeting();

        const handleSubmit = async (e) => {
                e.preventDefault();

                try {
                        const books = booksName.map((book) => ({
                                bookName: book,
                        }));

                        console.log(books);

                        await createFutureMeeting({
                                meetingTitle,
                                meetingDate,
                                proposedBooks: books,
                        });

                        navigate("/club"); // Navigate on successful mutation
                } catch (error) {
                        console.error(
                                "Failed to create future meeting:",
                                error,
                        );
                }
        };

        return (
                <div className="newFutureMeetingRootContainer">
                        <div className="newFutureMeetingWrapper">
                                <form onSubmit={handleSubmit}>
                                        <div className="newFutureMeetingFieldWrapper">
                                                <label
                                                        htmlFor="newFutureMeetingTitleTextField"
                                                        className="newFutureMeetingFieldLabel">
                                                        Title
                                                </label>
                                                <input
                                                        type="text"
                                                        id={
                                                                "newFutureMeetingTitleTextField"
                                                        }
                                                        name={
                                                                "newFutureMeetingTitleTextField"
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
                                        <div className="newFutureMeetingFieldWrapper">
                                                <label
                                                        htmlFor="newFutureMeetingBookTextField"
                                                        className="newFutureMeetingFieldLabel">
                                                        Meeting Books
                                                </label>
                                                <div className="newFutureMeetingBookFieldWrapper">
                                                        <input
                                                                id={
                                                                        "newFutureMeetingBookTextField"
                                                                }
                                                                name={
                                                                        "newFutureMeetingBookTextField"
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
                                                <List className="newFutureMeetingBookListRoot">
                                                        {booksName.map(
                                                                (
                                                                        book,
                                                                        index,
                                                                ) => (
                                                                        <List.Item
                                                                                className="newFutureMeetingBookListItem"
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

                                        <div className="newFutureMeetingFieldWrapper">
                                                <label
                                                        htmlFor="newFutureMeetingDateTextField"
                                                        className="newFutureMeetingFieldLabel">
                                                        Meeting Date
                                                </label>
                                                <input
                                                        type="Date"
                                                        id={
                                                                "newFutureMeetingDateTextField"
                                                        }
                                                        name={
                                                                "newFutureMeetingDateTextField"
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

                                        <div className="newFutureMeetingBtnsContainer">
                                                <button
                                                        type={"reset"}
                                                        className="newFutureMeetingCloseBtn"
                                                        onClick={() =>
                                                                navigate(
                                                                        "/club",
                                                                )
                                                        }>
                                                        Close
                                                </button>
                                                <button
                                                        className="newFutureMeetingSaveBtn"
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
