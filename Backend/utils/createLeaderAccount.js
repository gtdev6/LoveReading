const mongoose = require("mongoose");
const User = require("./../models/userModel"); // Adjust the path as necessary
const bcrypt = require("bcryptjs");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/LoveReading")
        .then(() => {
                console.log("Mongo DB Connected");
        })
        .catch((err) => console.log(err));

const createLeaderAccount = async () => {
        const name = "Ghulam Tahir";
        const email = "leader@lovereading.com";
        const password = "leaderPassword";

        // Check if a leader already exists
        const existingLeader = await User.findOne({ role: "Leader" });
        if (existingLeader) {
                console.log("A leader account already exists.");
                mongoose.disconnect();
                return;
        }

        // Hash the password
        // const hashedPassword = await bcrypt.hash(password, 10);

        // Create the leader user
        const leader = new User({
                name,
                email,
                password: password,
                role: "Leader",
        });

        const Leader = await leader.save();
        console.log(Leader);
        console.log("Leader account created successfully.");
        mongoose.disconnect();
};

createLeaderAccount().catch((err) => {
        console.error("Error creating leader account:", err);
        mongoose.disconnect();
});
