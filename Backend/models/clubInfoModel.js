const mongoose = require("mongoose");

const clubInfoSchema = new mongoose.Schema({
        aboutUs: { type: String, required: true },
        activities: { type: String, required: true },
        howToJoin: { type: String, required: true },
        featuredBooks: [{ name: String }],
        contactInfo: {
                email: { type: String, required: true },
                twitter: { type: String, required: true },
        },
});

module.exports = mongoose.model("ClubInfo", clubInfoSchema);
