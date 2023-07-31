const express = require("express")
require("dotenv").config();
var path = require('path')
const logger = require("./middlewares/logger")
const errorHandler = require ("./middlewares/error")
const connectDB = require("./data/connect")


const app = express();
connectDB()


const userRoute = require("./routes/user")
const categoryRoute = require("./routes/categoryRoute")


app.use(express.json()) 
app.use(errorHandler); 
app.use("/user", userRoute);
app.use("/category", categoryRoute);




app.listen(process.env.port, () => {
    console.log(`server listen ${process.env.port}`);
  });