import express from "express";
import { postOrder, getOrders } from "../controllers/orderController.js";
import { verifyToken } from "../middlewares.js";

const orderRouter = express.Router();

orderRouter
  .route("/orders")
  .get(verifyToken, getOrders)
  .post(verifyToken, postOrder);

export default orderRouter;
