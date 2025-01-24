const mongoose = require("mongoose");
require("dotenv").config();
exports.connectToMongoDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to DB");
    } catch (error) {
        console.log("Error in connecting to database",error.message);
    }
}