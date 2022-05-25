import express from "express";
import {
  postOrder,
  getOrders,
  getOrderById,
  patchOrder,
  getOrderHistory,
} from "../controllers/orderController.js";
import { verifyToken } from "../middlewares.js";

const orderRouter = express.Router();

orderRouter.route("/").get(verifyToken, getOrders).post(verifyToken, postOrder);
orderRouter
  .route("/:orderId([0-9a-f]{24})")
  .get(getOrderById)
  .patch(verifyToken, patchOrder);
orderRouter.route("/history").get(verifyToken, getOrderHistory);

export default orderRouter;
