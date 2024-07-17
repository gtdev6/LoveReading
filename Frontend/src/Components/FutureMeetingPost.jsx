import "./CSS/FutureMeetingPost.css";
import { useState } from "react";
import { IconCircleCheck, IconCircleCheckFilled } from "@tabler/icons-react";
import { Tabs } from "@mantine/core";
import { useAuth } from "../Context/AuthContext.js";
import { format } from "date-fns";
import useApproveBook from "../Hooks/useApproveBook.js";
import useAddSuggestionBook from "../Hooks/useAddSuggestionBook.js";

function FutureSuggestionBook({
        meetingId,
        bookData,
        isSuggestedBook = false,
}) {
        const mutation = useApproveBook();
        const { auth } = useAuth();
        const [isChecked, setIsChecked] = useState(() => {
                if (bookData) {
                        return bookData.acceptedBy.some(
                                (user_id) => user_id === auth.userId,
                        );
                } else {
                        return false;
                }
        });

        const handleCheckboxChange = () => {
                const bookId = bookData._id;
                console.log(isSuggestedBook);
                setIsChecked(!isChecked);
                mutation.mutate({ meetingId, bookId, isSuggestedBook });
        };

        if (bookData)
                return (
                        <div className="fMeetingInfoBookWrapper">
                                <div className="fMeetingInfoBookContainer">
                                        <div className="fMeetingBookRoot">
                                                <img
                                                        src="/Assets/Book.svg"
                                                        alt=""
                                                />
                                                <p>{bookData.bookName}</p>
                                        </div>
                                        <div className="fMeetingBookApproveInfoContainer">
                                                <p className="fMeetingApproveLabel">
                                                        {`Suggested By : ${bookData.suggestedBy.name}`}
                                                </p>
                                        </div>
                                        <div className="fMeetingBookApproveInfoContainer">
                                                <p className="fMeetingApproveLabel">
                                                        Approved By
                                                </p>
                                                <p className="fMeetingApproveNum">
                                                        {
                                                                bookData
                                                                        .acceptedBy
                                                                        .length
                                                        }
                                                </p>
                                        </div>
                                </div>
                                <div
                                        className="fMeetingBookCheckWrapper"
                                        onClick={handleCheckboxChange}
                                        style={{ cursor: "pointer" }}>
                                        {isChecked ? (
                                                <IconCircleCheckFilled
                                                        className=".fMeetingCheckFilledIcon"
                                                        color={"green"}
                                                />
                                        ) : (
                                                <IconCircleCheck
                                                        className=".fMeetinCheckIcon"
                                                        color={"#76453b"}
                                                />
                                        )}
                                </div>
                        </div>
                );

        return (
                <div className="fMeetingInfoBookWrapper">
                        <div className="fMeetingInfoBookContainer">
                                <div className="fMeetingBookRoot">
                                        <img src="/Assets/Book.svg" alt="" />
                                        <p>book Title</p>
                                </div>
                                <div className="fMeetingBookApproveInfoContainer">
                                        <p className="fMeetingApproveLabel">
                                                Suggested By: Name
                                        </p>
                                </div>
                                <div className="fMeetingBookApproveInfoContainer">
                                        <p className="fMeetingApproveLabel">
                                                Approved By
                                        </p>
                                        <p className="fMeetingApproveNum">32</p>
                                </div>
                        </div>
                        <div
                                className="fMeetingBookCheckWrapper"
                                onClick={handleCheckboxChange}
                                style={{ cursor: "pointer" }}>
                                {isChecked ? (
                                        <IconCircleCheckFilled
                                                className=".fMeetingCheckFilledIcon"
                                                color={"green"}
                                        />
                                ) : (
                                        <IconCircleCheck
                                                className=".fMeetinCheckIcon"
                                                color={"#76453b"}
                                        />
                                )}
                        </div>
                </div>
        );
}

export function FutureMeetingPost({ data }) {
        const {
                mutateAsync: addSuggestionBook,
                isLoading,
                error,
        } = useAddSuggestionBook();
        const [suggestionBookName, setSuggestionBookName] = useState("");
        const date = format(data.meetingDate, "dd/MM/yyyy");

        return (
                <div className="fMeetingContainer">
                        <div className="fMeetingWrapper">
                                <div className="meetingTitleWrapper">
                                        <p className="meetingTitleLabel">
                                                Meeting Title
                                        </p>
                                        <h1 className="fMeetingTitleHeading">
                                                {data.meetingTitle}
                                        </h1>
                                </div>
                                <div className="fMeetingDateWrapper">
                                        <p className="meetingTitleLabel">
                                                Meeting Date
                                        </p>
                                        <p className="fMeetingDate">{date}</p>
                                </div>
                                <div className="fMeetingInfoWrapper">
                                        {data.proposedBooks.map((book) => (
                                                <FutureSuggestionBook
                                                        bookData={book}
                                                        meetingId={data._id}
                                                        key={book._id}
                                                />
                                        ))}
                                </div>
                                <div className="fMeetingBookSuggestionsWrapper">
                                        <Tabs className="fMeetingTabsRoot">
                                                <Tabs.List className="fMeetingTabList">
                                                        <Tabs.Tab
                                                                className="fMeetingsTab"
                                                                value={
                                                                        "Suggest_Book"
                                                                }>
                                                                Suggest Book
                                                        </Tabs.Tab>
                                                        <Tabs.Tab
                                                                className="fMeetingsTab"
                                                                value={
                                                                        "Suggestions"
                                                                }>
                                                                Suggestions
                                                        </Tabs.Tab>
                                                </Tabs.List>
                                                <Tabs.Panel
                                                        className="fMeetingPanelSuggestPanel"
                                                        value={"Suggest_Book"}>
                                                        <form action="">
                                                                <input
                                                                        className="fMeetingBookNameTextField"
                                                                        type={
                                                                                "text"
                                                                        }
                                                                        placeholder={
                                                                                "Book Name"
                                                                        }
                                                                        value={
                                                                                suggestionBookName
                                                                        }
                                                                        onChange={(
                                                                                e,
                                                                        ) =>
                                                                                setSuggestionBookName(
                                                                                        e
                                                                                                .target
                                                                                                .value,
                                                                                )
                                                                        }
                                                                />
                                                                <button
                                                                        className="fMeetingBookFormBtn"
                                                                        disabled={
                                                                                isLoading
                                                                        }
                                                                        onClick={async (
                                                                                e,
                                                                        ) => {
                                                                                const meeting_Id =
                                                                                        data._id;
                                                                                e.preventDefault();
                                                                                if (
                                                                                        suggestionBookName !==
                                                                                        ""
                                                                                ) {
                                                                                        console.log(
                                                                                                suggestionBookName,
                                                                                        );
                                                                                        await addSuggestionBook(
                                                                                                {
                                                                                                        bookName: suggestionBookName,
                                                                                                        meetingId: meeting_Id,
                                                                                                },
                                                                                        );
                                                                                        setSuggestionBookName(
                                                                                                "",
                                                                                        );
                                                                                }
                                                                        }}>
                                                                        SAVE
                                                                </button>
                                                        </form>
                                                </Tabs.Panel>
                                                <Tabs.Panel
                                                        value={"Suggestions"}
                                                        className="fMeetingSuggestionsPanel">
                                                        {data.suggestions
                                                                .length ===
                                                                0 && (
                                                                <p className="noBooksSuggestedYet">
                                                                        No Books
                                                                        Suggested
                                                                        Yet!
                                                                </p>
                                                        )}

                                                        {data.suggestions.map(
                                                                (book) => (
                                                                        <FutureSuggestionBook
                                                                                key={
                                                                                        book._id
                                                                                }
                                                                                bookData={
                                                                                        book
                                                                                }
                                                                                meetingId={
                                                                                        data._id
                                                                                }
                                                                                isSuggestedBook={
                                                                                        true
                                                                                }
                                                                        />
                                                                ),
                                                        )}
                                                        {/*<FutureSuggestionBook />*/}
                                                </Tabs.Panel>
                                        </Tabs>
                                </div>
                        </div>
                </div>
        );
}
