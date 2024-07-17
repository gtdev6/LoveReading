const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = require("mongoose");

const userSchema = new mongoose.Schema({
        name: {
                type: String,
                required: [true, "A user must have a name"],
        },
        email: {
                type: String,
                required: [true, "A user must have an Email"],
                unique: true,
        },
        password: {
                type: String,
                required: [true, "A user must have a password"],
                select: false,
        },
        role: {
                type: String,
                enum: ["Member", "Leader"],
                default: "Member",
        },
        profile: { type: Schema.Types.ObjectId, ref: "Profile" },
        suggestions: [{ type: Schema.Types.ObjectId, ref: "Suggestion" }],
        bookings: [{ type: Schema.Types.ObjectId, ref: "Meeting" }],
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
});

// // Define a virtual property for profile picture URL
// userSchema.virtual("profilePictureUrl").get(function () {
//         if (this.profile && this.profile.profilePicture) {
//                 // Assuming the uploads are served from '/uploads/' directory
//                 return '${req.protocol}://${req.get("host")}/uploads/${this.profile.profilePicture}';
//         }
//         // Handle cases where profile picture is not available
//         return '${req.protocol}://${req.get("host")}/default-profile-picture.jpg';
// });

userSchema.methods.matchPassword = async function (
        enteredPassword,
        userPassword,
) {
        try {
                const isMatch = await bcrypt.compare(
                        enteredPassword,
                        userPassword,
                );
                return isMatch;
        } catch (error) {
                return false;
        }
};

userSchema.pre("save", async function (next) {
        if (!this.isModified("password")) {
                next();
        }
        this.password = await bcrypt.hash(this.password, 10);
});

userSchema.pre("save", function (next) {
        this.updatedAt = Date.now();
        next();
});

// userSchema.pre(/^find/, function (next) {
//         this.populate({
//                 path: "profile",
//                 select: "_id userId profilePicture dateOfBirth bio",
//         });
//         next();
// });

// userSchema.pre("find", function (next) {
//         this.populate({
//                 path: "profile",
//                 select: "_id userId profilePicture dateOfBirth bio",
//         });
//         next();
// });

const User = mongoose.model("User", userSchema);

module.exports = User;
