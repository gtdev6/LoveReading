const app = require("./app");
const mongoose = require("mongoose");

process.on("uncaughtException", (err) => {
        console.log(err);
        console.log(err.name, err.message);
        console.log("UNHANDLED Exception! 💣");
});

const PORT = process.env.PORT || 9000;

if (process.env.NODE_ENV === "production") {
        mongoose.connect(process.env.DATABASE_ATLAS_URL).then((con) => {
                console.log("DB Connected Successfully");
        });
} else {
        mongoose.connect(process.env.DATABASE_URL).then((con) => {
                console.log("Local Database Connected Successfully");
        });
}

const server = app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
        console.log(err);
        console.log(err.name, err.message);
        console.log("UNHANDLED REJECTION! 💣 Shutting down...");
        server.close(() => {
                process.exit(1);
        });
});
