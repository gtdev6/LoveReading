const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const profileSchema = new mongoose.Schema({
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        name: { type: String },
        profilePicture: { type: String },
        profilePictureURL: { type: String },
        profilePicturePublicId: { type: String },
        dateOfBirth: { type: Date },
        bio: { type: String },
        shortStories: [{ type: Schema.Types.ObjectId, ref: "ShortStory" }],
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
});

profileSchema.pre("save", function (next) {
        this.updatedAt = Date.now();
        next();
});

// profileSchema.pre(/^find/, function (next) {
//         this.populate({
//                 path: "shortStories",
//                 select: "-__v", // Specify fields to include
//                 options: { sort: { postedAt: -1 } },
//                 populate: {
//                         path: "author", // Populate the author field in shortStories
//                         select: "name", // Specify fields to include in the author
//                 },
//         });
//         next();
// });

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
