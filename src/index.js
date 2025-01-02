const express = require("express");
const connectDB = require("./database/db");
const app = express();
require("dotenv").config({ path: '../.env' });
const PORT = process.env.PORT || 3000;
const userRouter = require("./routes/userRouters.js");

connectDB();

app.use("/", userRouter);

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});