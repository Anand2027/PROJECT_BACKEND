const mongoose = require('mongoose');

// Always store credentials in environment variables instead of hardcoding
const URI = process.env.MONGODB_URI

const connectDb = async () => {
    try {
        await mongoose.connect(URI); // No options needed for Mongoose 6+
        console.log("✅ Connected to MongoDB successfully");
    } catch (error) {
        console.error("❌ Failed to connect to MongoDB:", error.message);
        process.exit(1);
    }
};

module.exports = connectDb;
