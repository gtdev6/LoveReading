const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const shortStorySchema = new Schema({
        title: { type: String, required: true },
        content: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, ref: "User", required: true },
        postedAt: { type: Date, default: Date.now },
});

shortStorySchema.pre("/^find/", function (next) {
        this.populate({
                path: "author",
                select: "name", // Specify fields to include
        });
        next();
});

module.exports = mongoose.model("ShortStory", shortStorySchema);
