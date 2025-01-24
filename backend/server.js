const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");
const userRoutes = require("./routes/userRoutes");
const { connectToMongoDB } = require("./db/connectToMongoDB");
const cors = require("cors");
const { app, server } = require("./socket/socket");

// const app = express();
const PORT = process.env.PORT;
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
// app.get("/",(req,res)=>{
//     res.send("HELLO WORLD....");
// })

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`RUNNING ON PORT ${PORT}`);
});
