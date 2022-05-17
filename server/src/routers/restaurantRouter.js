import express from "express";
import {
  getMenus,
  postMenu,
  postCustomMadeNft,
} from "../controllers/userController.js";
import { verifyToken } from "../middlewares.js";

const restaurantRouter = express.Router();

restaurantRouter
  .route("/:restaurantId([0-9a-f]{24})/menus")
  .get(getMenus)
  .post(verifyToken, postMenu);

restaurantRouter.post(
  "/:restaurantId([0-9a-f]{24})/nfts",
  verifyToken,
  postCustomMadeNft
);

export default restaurantRouter;
