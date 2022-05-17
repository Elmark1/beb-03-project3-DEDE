import express from "express";
import { postOrder } from "../controllers/orderController.js";
import { verifyToken } from "../middlewares.js";

const orderRouter = express.Router();

orderRouter.post("/orders", verifyToken, postOrder);

export default orderRouter;
