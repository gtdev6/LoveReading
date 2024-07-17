const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const meetingSchema = new mongoose.Schema({
        title: {
                type: String,
                required: [true, "A Meeting must have a Title"],
                unique: true,
        },
        description: {
                type: String,
                required: [true, "A Meeting must have a Description"],
        },
        date: { type: Date, required: [true, "A Meeting must have a Date"] },
        time: { type: String, required: [true, "A Meeting must have a Time"] },
        location: {
                type: String,
                required: [true, "A Meeting must have a Location"],
        },
        books: [{ type: String }], // List of books to be discussed
        attendees: [{ type: Schema.Types.ObjectId, ref: "User" }],
        createdAt: { type: Date, default: Date.now },
});

// Define query middleware to automatically populate 'attendees'
meetingSchema.pre(/^find/, function (next) {
        this.populate({
                path: "attendees",
                select: "_id name role", // Specify fields to include
        });
        next();
});

module.exports = mongoose.model("Meeting", meetingSchema);
