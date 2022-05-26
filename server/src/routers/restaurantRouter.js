import express from "express";
import {
  getRestaurants,
  getMenusById,
  postMenu,
  getCustomMadeNft,
  postCustomMadeNft,
} from "../controllers/userController.js";
import { verifyToken } from "../middlewares.js";

const restaurantRouter = express.Router();

restaurantRouter.get("/", getRestaurants);
restaurantRouter
  .route("/:restaurantId([0-9a-f]{24})/menus")
  .get(getMenusById)
  .post(verifyToken, postMenu);

restaurantRouter
  .route("/:restaurantId([0-9a-f]{24})/nfts")
  .get(getCustomMadeNft)
  .post(verifyToken, postCustomMadeNft);

export default restaurantRouter;
