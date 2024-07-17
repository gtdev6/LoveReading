const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const suggestionSchema = new Schema({
        topic: { type: String, required: true },
        subject: { type: String, required: true },
        description: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, ref: "User", required: true },
        postedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Suggestion", suggestionSchema);
