const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const userRoutes = require('./routes/userRoutes.js');

app.use(express.json());
app.use(cookieParser());
app.use('/', userRoutes);
require("dotenv").config();

app.listen(6500, () => {
    console.log("The server is currently running in the port 6500");
});