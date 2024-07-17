const FutureMeeting = require("./../models/futureMeetingModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllFutureMeetings = catchAsync(async (req, res) => {
        const meetings = FutureMeeting.find();

        const features = new APIFeatures(meetings, req.query)
                .limitFields()
                .filter()
                .sort();

        const sortedMeetings = await features.query.sort("-createdAt");

        res.status(200).json({
                status: "Success",
                futureMeetings: sortedMeetings,
        });
});

exports.getFutureMeeting = catchAsync(async (req, res, next) => {
        const meetingId = req.params.id;

        const meeting = await FutureMeeting.findById(meetingId);

        if (!meeting) {
                return next(
                        new AppError(`Meeting with id ${meetingId} not found!`),
                );
        }

        res.status(200).json({
                status: "Success",
                data: {
                        meeting,
                },
        });
});

// exports.createFutureMeeting = catchAsync(async (req, res, next) => {
//         console.log(req.body);
//         const newMeeting = new FutureMeeting(req.body);
//         // const meeting = await newMeeting.save();
//
//         // if (!meeting) {
//         //         return next(
//         //                 new AppError("Error creating the future meeting", 400),
//         //         );
//         // }
//
//         res.status(201).send({
//                 status: "Success",
//                 data: {
//                         // meeting,
//                 },
//         });
// });

exports.createFutureMeeting = catchAsync(async (req, res, next) => {
        console.log(req.body);
        // const jsonData = JSON.parse(req.body);
        const { data } = req.body;

        const parseData = JSON.parse(data);

        // Parse the request body
        const { meetingTitle, meetingDate, proposedBooks } = parseData;

        // Check if a FutureMeeting with the same title already exists
        const existingMeeting = await FutureMeeting.findOne({ meetingTitle });
        if (existingMeeting) {
                return next(
                        new AppError(
                                "A future meeting with this title already exists",
                                400,
                        ),
                );
        }

        // Modify each book in the proposedBooks array to include suggestedBy
        const updatedProposedBooks = proposedBooks.map((book) => ({
                ...book,
                suggestedBy: req.user.id,
        }));

        // Create a new FutureMeeting with the updated proposedBooks array
        const newMeeting = new FutureMeeting({
                meetingTitle,
                meetingDate,
                proposedBooks: updatedProposedBooks,
        });

        // Save the new meeting to the database
        const meeting = await newMeeting.save();

        // Handle the case where the meeting could not be saved
        if (!meeting) {
                return next(
                        new AppError("Error creating the future meeting", 400),
                );
        }

        // Send a successful response
        res.status(201).send({
                status: "Success",
                data: {
                        meeting,
                },
        });
});

exports.updateFutureMeeting = catchAsync(async (req, res, next) => {
        const meetingId = req.params.id;
        const meeting = await FutureMeeting.findByIdAndUpdate(
                meetingId,
                req.body,
                {
                        new: true,
                },
        );

        if (!meeting) {
                return next(
                        new AppError(`Meeting with id ${meetingId} not found`),
                );
        }

        meeting.update;

        res.status(200).json({
                status: "Success",
                data: {
                        meeting,
                },
        });
});

// Example function to book a meeting
exports.approveFutureMeetingBook = catchAsync(async (req, res, next) => {
        const { meetingId, bookId, isSuggestedBook } = req.body;
        console.log("Is Suggested Book", isSuggestedBook);
        const userId = req.user.id;

        const meeting = await FutureMeeting.findById(meetingId);

        if (!meeting) {
                return next(new AppError("Meeting not found", 404));
        }

        let book;
        if (!isSuggestedBook) book = meeting.proposedBooks.id(bookId);
        if (isSuggestedBook) book = meeting.suggestions.id(bookId);

        if (!book) {
                return next(new AppError("Book not found", 404));
        }

        // Check if the user is already in the acceptedBy array
        const userIndex = book.acceptedBy.findIndex(
                (id) => id.toString() === userId,
        );

        if (userIndex !== -1) {
                // User has already accepted, so remove the user ID from the array
                book.acceptedBy.splice(userIndex, 1);
        } else {
                // Add user ID to the acceptedBy array
                book.acceptedBy.push(userId);
        }

        await meeting.save();

        res.status(200).json({
                status: "Success",
                data: {
                        meeting,
                },
        });
});

exports.addBookToSuggestions = catchAsync(async (req, res, next) => {
        const { bookName, meetingId } = req.body;
        console.log("Book Name, & Meeting Id", bookName, meetingId);
        const userId = req.user.id;

        if (!bookName) {
                return next(new AppError("Book name is required", 400));
        }

        if (!meetingId) {
                return next(new AppError("Meeting ID is required", 400));
        }

        const meeting = await FutureMeeting.findById(meetingId);

        if (!meeting) {
                return next(new AppError("Meeting not found", 404));
        }

        // Check if a book with the same name already exists in the suggestions array
        const isBookExists = meeting.suggestions.some(
                (book) =>
                        book.bookName.toLowerCase() === bookName.toLowerCase(),
        );

        if (isBookExists) {
                return next(
                        new AppError(
                                "Book with the same name already exists in suggestions",
                                400,
                        ),
                );
        }

        const newBook = {
                bookName,
                suggestedBy: userId,
                acceptedBy: [],
        };

        meeting.suggestions.push(newBook);
        await meeting.save();

        res.status(200).json({
                status: "Success",
                data: {
                        meeting,
                },
        });
});

exports.deleteFutureMeeting = catchAsync(async (req, res, next) => {
        const meetingId = req.params.id;

        const meeting = await FutureMeeting.findByIdAndDelete(meetingId);

        if (!meeting) {
                return next(
                        new AppError(`Meeting with id ${meetingId} not found!`),
                );
        }

        res.status(200).json({
                status: "Success",
                data: {
                        meeting,
                },
        });
});
