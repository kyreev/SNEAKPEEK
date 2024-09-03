import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/dbConnect.js";

dotenv.config();

dbConnect();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use();

app.use();

app.use();

app.use();

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
