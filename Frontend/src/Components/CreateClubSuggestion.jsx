import "./CSS/CreateClubSuggestion.css";
import { useNavigate } from "react-router-dom";
import { useCreateSuggestion } from "../Hooks/useSuggestions.js";
import { useState } from "react";
import { toast } from "react-toastify";

export function CreateClubSuggestion() {
        const navigate = useNavigate();
        const { mutate: createSuggestion } = useCreateSuggestion();

        const [title, setTitle] = useState("");
        const [subject, setSubject] = useState("");
        const [description, setDescription] = useState("");

        const handleSubmit = (e) => {
                e.preventDefault();
                createSuggestion(
                        { topic: title, description, subject }, // Replace 'authorId' with the actual author ID
                        {
                                onSuccess: () => {
                                        toast.success(
                                                "Suggestion created Successfully",
                                                {
                                                        style: {
                                                                fontSize: "2rem",
                                                                color: "#76453b",
                                                        },
                                                        position: "top-center",
                                                        autoClose: 1000,
                                                },
                                        );
                                        navigate("/clubSuggestions");
                                        console.log("Success");
                                },
                        },
                );
        };

        return (
                <div className="newClubSuggestionRootContainer">
                        <div className="newClubSuggestionWrapper">
                                <form onSubmit={handleSubmit}>
                                        <div className="newClubSuggestionFieldWrapper">
                                                <label
                                                        htmlFor="newClubSuggestionTitleTextField"
                                                        className="newClubSuggestionFieldLabel">
                                                        Title
                                                </label>
                                                <input
                                                        type="text"
                                                        id={
                                                                "newClubSuggestionTitleTextField"
                                                        }
                                                        name={
                                                                "newClubSuggestionTitleTextField"
                                                        }
                                                        placeholder={
                                                                "Suggestion Title"
                                                        }
                                                        value={title}
                                                        onChange={(e) =>
                                                                setTitle(
                                                                        e.target
                                                                                .value,
                                                                )
                                                        }
                                                />
                                        </div>
                                        <div className="newClubSuggestionFieldWrapper">
                                                <label
                                                        htmlFor="newClubSuggestionSubjectTextField"
                                                        className="newClubSuggestionFieldLabel">
                                                        Subject
                                                </label>
                                                <input
                                                        type="text"
                                                        id={
                                                                "newClubSuggestionSubjectTextField"
                                                        }
                                                        name={
                                                                "newClubSuggestionTitleTextField"
                                                        }
                                                        placeholder={
                                                                "Suggestion Subject"
                                                        }
                                                        value={subject}
                                                        onChange={(e) =>
                                                                setSubject(
                                                                        e.target
                                                                                .value,
                                                                )
                                                        }
                                                />
                                        </div>
                                        <div className="newClubSuggestionFieldWrapper">
                                                <label
                                                        htmlFor="newClubSuggestionDescTextField"
                                                        className="newClubSuggestionFieldLabel">
                                                        Description
                                                </label>
                                                <textarea
                                                        id={
                                                                "newClubSuggestionDescTextField"
                                                        }
                                                        name={
                                                                "newClubSuggestionTitleTextField1"
                                                        }
                                                        placeholder={
                                                                "Suggestion Description"
                                                        }
                                                        value={description}
                                                        onChange={(e) =>
                                                                setDescription(
                                                                        e.target
                                                                                .value,
                                                                )
                                                        }
                                                />
                                        </div>
                                        <div className="newClubSuggestionBtnsContainer">
                                                <button
                                                        type={"reset"}
                                                        className="newClubSuggestionCloseBtn"
                                                        onClick={() =>
                                                                navigate(
                                                                        "/clubSuggestions",
                                                                )
                                                        }>
                                                        Close
                                                </button>
                                                <button
                                                        className="newClubSuggestionSaveBtn"
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
