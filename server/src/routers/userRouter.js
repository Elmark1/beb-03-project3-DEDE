import express from "express";
import { getUserInfo } from "../controllers/userController.js";
import { verifyToken } from "../middlewares.js";

const userRouter = express.Router();

userRouter.route("/:userId([0-9a-f]{24})").get(verifyToken, getUserInfo);

export default userRouter;
