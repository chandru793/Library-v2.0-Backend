const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const router = require("./routes/routes");
const connectDB = require("./db/db");
const { Console } = require("console");

const port = process.env.PORT || 8080;

//middlewares
app.use(express.json());
app.use(cors());
app.use("/api/v2/library", router);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening at port ${port}`));
    console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
};
start();