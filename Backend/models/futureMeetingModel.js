const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const bookSchema = new mongoose.Schema({
        bookName: { type: String },
        acceptedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
        suggestedBy: { type: Schema.Types.ObjectId, ref: "User" },
});

bookSchema.pre(/^find/, function (next) {
        this.populate({
                path: "suggestedBy",
                select: "_id name role", // Specify fields to include
        });
        next();
});

const futureMeetingSchema = new mongoose.Schema({
        meetingTitle: { type: String },
        meetingDate: { type: Date },
        proposedBooks: [bookSchema],
        suggestions: [bookSchema],
        createdAt: { type: Date, default: Date.now },
});

// Add a pre-find hook to populate nested bookSchema in futureMeetingSchema
futureMeetingSchema.pre(/^find/, function (next) {
        this.populate({
                path: "proposedBooks.suggestedBy",
                select: "_id name role",
        }).populate({
                path: "suggestions.suggestedBy",
                select: "_id name role",
        });
        next();
});

// Define query middleware to automatically populate 'attendees'

module.exports = mongoose.model("FutureMeeting", futureMeetingSchema);
