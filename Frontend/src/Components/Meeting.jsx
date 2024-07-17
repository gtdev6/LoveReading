import "./CSS/Meeting.css";
import { format, parse } from "date-fns";
import { useAuth } from "../Context/AuthContext.js";
import useBookMeeting from "../Hooks/useBookMeeting.js";

const formatTime = (timeString) => {
        // Create a date object with the time string
        const date = parse(timeString, "HH:mm", new Date());
        // Format the date object to the desired format
        return format(date, "hh:mm a");
};

export function Meeting({ data }) {
        const { auth } = useAuth();
        const {
                mutate: bookMeeting,
                isLoading,
                isError,
                error,
        } = useBookMeeting();
        const date = format(data.date, "dd/MM/yyyy");
        const time = formatTime(data.time);

        const booked =
                auth &&
                auth.userId &&
                data.attendees.some((attendee) => attendee._id === auth.userId);

        const handleBookMeeting = () => {
                bookMeeting(data._id);
        };

        if (data)
                return (
                        <div className="meetingRoot">
                                <div className="meetingWrapper">
                                        <div className="meetingTitleWrapper">
                                                <p className="meetingTitleLabel">
                                                        Meeting Title
                                                </p>
                                                <h1 className="meetingTitleHeading">
                                                        {data.title}
                                                </h1>
                                        </div>
                                        <div className="meetingDescWrapper">
                                                <p className="meetingDescLabel">
                                                        Meeting Description
                                                </p>
                                                <p className="meetingDescription">
                                                        {data.description}
                                                </p>
                                        </div>
                                        <div className="meetingBooksWrapper">
                                                <p className="meetingBookLabel">
                                                        Books
                                                </p>
                                                <div className="meetingBooksContainer">
                                                        {data.books.map(
                                                                (
                                                                        book,
                                                                        index,
                                                                ) => (
                                                                        <p
                                                                                key={
                                                                                        index
                                                                                }>
                                                                                <img
                                                                                        src="/Assets/Book.svg"
                                                                                        alt=""
                                                                                />
                                                                                {
                                                                                        book
                                                                                }
                                                                        </p>
                                                                ),
                                                        )}
                                                </div>
                                        </div>
                                        <div className="meetingInfoWrapper">
                                                <p className="meetingDate_TimeLabel">
                                                        Date, Time & Location
                                                </p>
                                                <div className="meetingInfoContainer">
                                                        <p>
                                                                <strong>
                                                                        Date:
                                                                </strong>
                                                                <span>
                                                                        {date}
                                                                </span>
                                                        </p>
                                                        <p>
                                                                <strong>
                                                                        Time:
                                                                </strong>
                                                                <span>
                                                                        {time}
                                                                </span>
                                                        </p>
                                                        <p>
                                                                <strong>
                                                                        Location:{" "}
                                                                </strong>
                                                                <span>
                                                                        {
                                                                                data.location
                                                                        }
                                                                </span>
                                                        </p>
                                                </div>
                                        </div>
                                        <div className="meetingAttendeesWrapper">
                                                <p className="meetingAttendeesLabel">
                                                        Booked By
                                                </p>
                                                <p className="meetingBookByContainer">
                                                        {data.attendees.length}{" "}
                                                        Members
                                                </p>
                                        </div>
                                        <div className="meetingBookBtnWrapper">
                                                <button
                                                        className="bookMeetingBtn"
                                                        disabled={booked}
                                                        onClick={
                                                                handleBookMeeting
                                                        }>
                                                        {!booked
                                                                ? `Book Meeting`
                                                                : `Booked`}
                                                </button>
                                        </div>
                                </div>
                        </div>
                );

        return (
                <div className="meetingRoot">
                        <div className="meetingWrapper">
                                <div className="meetingTitleWrapper">
                                        <p className="meetingTitleLabel">
                                                Meeting Title
                                        </p>
                                        <h1 className="meetingTitleHeading">
                                                Meeting Title
                                        </h1>
                                </div>
                                <div className="meetingDescWrapper">
                                        <p className="meetingDescLabel">
                                                Meeting Description
                                        </p>
                                        <p className="meetingDescription">
                                                Lorem ipsum dolor sit amet,
                                                consectetur adipiscing elit.
                                                Autem euismod ea stet nihil
                                                soluta veniam doming nonummy.
                                                Minim sint iriure nonummy zzril
                                                assum assum eiusmod lorem
                                                facilisis at liber, elit lorem
                                                sea rebum eirmod no veniam
                                                sanctus placerat blandit iure
                                                ea. Imperdiet elitr magna est.
                                                Nonummy quod feugiat, anim eos
                                                placerat aliquyam aliquam nobis
                                                sunt non adipisici est diam
                                                magna diam tation no dolore
                                                imperdiet aliquid. Zzril vero
                                                cillum voluptua illum elitr nibh
                                                luptatum. Mollit duo ad lorem
                                                wisi minim. Sint amet commodo.
                                                Deserunt adipiscing possim.
                                        </p>
                                </div>
                                <div className="meetingBooksWrapper">
                                        <p className="meetingBookLabel">
                                                Books
                                        </p>
                                        <div className="meetingBooksContainer">
                                                <p>
                                                        <img
                                                                src="/Assets/Book.svg"
                                                                alt=""
                                                        />
                                                        Book 1
                                                </p>
                                                <p>
                                                        <img
                                                                src="/Assets/Book.svg"
                                                                alt=""
                                                        />
                                                        Book 2
                                                </p>
                                                <p>
                                                        <img
                                                                src="/Assets/Book.svg"
                                                                alt=""
                                                        />
                                                        Book 3
                                                </p>
                                                <p>
                                                        <img
                                                                src="/Assets/Book.svg"
                                                                alt=""
                                                        />
                                                        Book 4
                                                </p>
                                                <p>
                                                        <img
                                                                src="/Assets/Book.svg"
                                                                alt=""
                                                        />
                                                        Book 5
                                                </p>
                                                <p>
                                                        <img
                                                                src="/Assets/Book.svg"
                                                                alt=""
                                                        />
                                                        Book 6
                                                </p>
                                                <p>
                                                        <img
                                                                src="/Assets/Book.svg"
                                                                alt=""
                                                        />
                                                        Book 7
                                                </p>
                                                <p>
                                                        <img
                                                                src="/Assets/Book.svg"
                                                                alt=""
                                                        />
                                                        Book 8
                                                </p>
                                                <p>
                                                        <img
                                                                src="/Assets/Book.svg"
                                                                alt=""
                                                        />
                                                        Book 9
                                                </p>
                                                <p>
                                                        <img
                                                                src="/Assets/Book.svg"
                                                                alt=""
                                                        />
                                                        Book 10
                                                </p>
                                                <p>
                                                        <img
                                                                src="/Assets/Book.svg"
                                                                alt=""
                                                        />
                                                        Book 11
                                                </p>
                                                <p>
                                                        <img
                                                                src="/Assets/Book.svg"
                                                                alt=""
                                                        />
                                                        Book 12
                                                </p>
                                        </div>
                                </div>
                                <div className="meetingInfoWrapper">
                                        <p className="meetingDate_TimeLabel">
                                                Date, Time & Location
                                        </p>
                                        <div className="meetingInfoContainer">
                                                <p>
                                                        <strong>Date:</strong>
                                                        <span>30/06/2024</span>
                                                </p>
                                                <p>
                                                        <strong>Time:</strong>
                                                        <span>10:30 pm</span>
                                                </p>
                                                <p>
                                                        <strong>
                                                                Location:{" "}
                                                        </strong>
                                                        <span>
                                                                Test Location
                                                        </span>
                                                </p>
                                        </div>
                                </div>
                                <div className="meetingAttendeesWrapper">
                                        <p className="meetingAttendeesLabel">
                                                Booked By
                                        </p>
                                        <p className="meetingBookByContainer">
                                                5 Members
                                        </p>
                                </div>
                                <div className="meetingBookBtnWrapper">
                                        <button className="bookMeetingBtn">
                                                Book Meeting
                                        </button>
                                </div>
                        </div>
                </div>
        );
}
