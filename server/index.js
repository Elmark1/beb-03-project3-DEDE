// Import packages
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import rootRouter from "./src/routers/rootRouter.js";
import userRouter from "./src/routers/userRouter.js";
import restaurantRouter from "./src/routers/restaurantRouter.js";
import orderRouter from "./src/routers/orderRouter.js";
import adminRouter from './src/routers/adminRouter.js';
import dexRouter from './src/routers/dexRouter.js';

dotenv.config();

const app = express();

// Apply middleware
app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const PORT = process.env.PORT || 4000;

// Routes
app.use("/", rootRouter);
app.use("/", adminRouter);
app.use("/users", userRouter);
app.use("/restaurants", restaurantRouter);
app.use("/orders", orderRouter);
app.use("/dexes", dexRouter);

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

// Conncet MongoDB and Server
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}...`);
    });
  })
  .catch((err) => console.log(err));
