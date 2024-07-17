import "./CSS/ClubSuggestion.css";
import { IconArrowNarrowLeft, IconPencil } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useGetSuggestions } from "../Hooks/useSuggestions.js";
import { Spinner } from "../Util Components/Spinner.jsx";
import { formatDate } from "date-fns/format";

function ClubSuggestionPost({ suggestionData }) {
        return (
                <div className="clubSuggestionPostRoot">
                        <div className="clubSuggestionPostWrapper">
                                <div className="clubSuggestionPostTitleWrapper">
                                        <p className="clubSuggestionPostTitleLabel">
                                                Suggestion Title
                                        </p>
                                        <h1 className="clubSuggestionPostTitleHeading">
                                                {(suggestionData &&
                                                        suggestionData.topic) ||
                                                        "Suggestion Title"}
                                        </h1>
                                </div>
                                <div className="clubSuggestionPostedAtWrapper">
                                        <p className="clubSuggestionPostedAtP">
                                                Posted At{" "}
                                                <span>
                                                        {(suggestionData &&
                                                                formatDate(
                                                                        suggestionData.postedAt,
                                                                        "dd/MM/yyyy",
                                                                )) ||
                                                                "10/11/2024"}
                                                </span>
                                        </p>
                                </div>
                                <div className="clubSuggestionPostSubjectWrapper">
                                        <p className="clubSuggestionPostSubjectLabel">
                                                Subject
                                        </p>
                                        <h2 className="clubSuggestionPostSubjectHeading">
                                                {(suggestionData &&
                                                        suggestionData.subject) ||
                                                        "Subject Title"}
                                        </h2>
                                </div>
                                <div className="clubSuggestionPostDescWrapper">
                                        <p className="clubSuggestionPostDescLabel">
                                                Description
                                        </p>
                                        <p
                                                style={{
                                                        whiteSpace: "pre-wrap",
                                                }}
                                                className="clubSuggestionPostDescription">
                                                {(suggestionData &&
                                                        suggestionData.description) ||
                                                        "Suggestion description"}
                                        </p>
                                </div>
                        </div>
                </div>
        );
}

export function ClubSuggestions() {
        const navigate = useNavigate();
        const { data: suggestions, isLoading, error } = useGetSuggestions();

        if (isLoading) {
                return <Spinner />;
        }

        if (suggestions)
                return (
                        <div className="clubSuggestionsRootContainer">
                                <div className="clubSuggestionsBackBtnWrapper">
                                        <button
                                                className="clubSuggestionsBackBtn"
                                                onClick={() =>
                                                        navigate("/club")
                                                }>
                                                <IconArrowNarrowLeft /> Back to
                                                Club
                                        </button>
                                        <button
                                                className="clubSuggestionsBackBtn"
                                                onClick={() =>
                                                        navigate(
                                                                "/clubSuggestions/new",
                                                        )
                                                }>
                                                Suggest Club
                                        </button>
                                </div>
                                <div className="clubSuggestionsContentBody">
                                        {suggestions &&
                                                suggestions.map(
                                                        (suggestion) => (
                                                                <ClubSuggestionPost
                                                                        key={
                                                                                suggestion._id
                                                                        }
                                                                        suggestionData={
                                                                                suggestion
                                                                        }
                                                                />
                                                        ),
                                                )}
                                </div>
                        </div>
                );

        // return (
        //         <div className="clubSuggestionsRootContainer">
        //                 <div className="clubSuggestionsBackBtnWrapper">
        //                         <button
        //                                 className="clubSuggestionsBackBtn"
        //                                 onClick={() => navigate("/club")}>
        //                                 <IconArrowNarrowLeft /> Back to Club
        //                         </button>
        //                         <button
        //                                 className="clubSuggestionsBackBtn"
        //                                 onClick={() =>
        //                                         navigate("/clubSuggestions/new")
        //                                 }>
        //                                 Suggest Club
        //                         </button>
        //                 </div>
        //                 <div className="clubSuggestionsContentBody">
        //                         <ClubSuggestionPost />
        //                 </div>
        //         </div>
        // );
}
