const express = require("express");
const connectDB = require("./database/db");
const app = express();
const PORT = process.env.PORT || 3000;
const userRouter = require("./routes/userRouters.js");
const bodyParser = require('body-parser');
require("dotenv").config({ path: '../.env' });

connectDB();

app.use(bodyParser.json());
app.use("/", userRouter);

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});