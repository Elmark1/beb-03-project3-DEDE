import express from "express";
import { getUserInfo } from "../controllers/userController";

const userRouter = express.Router();

userRouter.route("/:userId([0-9a-f]{24})").get(getUserInfo);

export default userRouter;
