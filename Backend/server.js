import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/user.js";
import businessRoutes from "./routes/business.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/user", userRoutes);
app.use("/business", businessRoutes);

mongoose.connect(process.env.MONGO_CLIENT);

let port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`The server is running on port: ${port}`);
});
