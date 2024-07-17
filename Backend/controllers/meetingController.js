const Meeting = require("./../models/meetingModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllMeetings = catchAsync(async (req, res) => {
        const meetings = Meeting.find();

        const features = new APIFeatures(meetings, req.query)
                .limitFields()
                .filter()
                .sort();

        const sortedMeetings = await features.query.select("-createdAt");

        res.status(200).json({
                status: "Success",
                meetings: sortedMeetings,
        });
});

exports.getMeeting = catchAsync(async (req, res, next) => {
        const meetingId = req.params.id;

        const meeting = await Meeting.findById(meetingId);

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

exports.createMeeting = catchAsync(async (req, res, next) => {
        console.log(req.body);
        const newMeeting = new Meeting(req.body);
        const meeting = await newMeeting.save();
        //
        if (!meeting) {
                return next(new AppError("Error creating the meeting", 400));
        }

        res.status(201).json({
                status: "Success",
                data: {
                        meeting,
                },
        });
});

exports.updateMeeting = catchAsync(async (req, res, next) => {
        const meetingId = req.params.id;
        const meeting = await Meeting.findByIdAndUpdate(meetingId, req.body, {
                new: true,
        });

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
exports.bookMeeting = catchAsync(async (req, res, next) => {
        const { meetingId } = req.body;

        const meeting = await Meeting.findById(meetingId);

        console.log(meeting);
        // Check if the user is already booked or in attendees
        const isUserAlreadyBooked =
                meeting.attendees.filter(
                        (att) => att._id.toString() === req.user.id,
                ).length > 0;

        if (isUserAlreadyBooked) {
                return next(
                        new AppError("User is already booked for this meeting"),
                );
        }

        // Find the meeting by ID and update the bookedBy array
        const updatedMeeting = await Meeting.findByIdAndUpdate(
                meetingId,
                { $push: { attendees: req.user.id } },
                { new: true }, // Return the updated document
        );

        if (!updatedMeeting) {
                return next(new AppError("Meeting not found", 400));
        }

        res.status(200).json({
                status: "Success",
                data: {
                        meeting: updatedMeeting,
                },
        });
});

exports.deleteMeeting = catchAsync(async (req, res, next) => {
        const meetingId = req.params.id;

        const meeting = await Meeting.findByIdAndDelete(meetingId);

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
