import express from "express";
import {
  postSignUp,
  postSignIn,
  getSignOut,
} from "../controllers/userController.js";
import { verifyToken } from "../middlewares.js";

const userRouter = express.Router();

userRouter.post("/signup", postSignUp);
userRouter.post("/signin", postSignIn);
userRouter.get("/signout", verifyToken, getSignOut);

export default userRouter;
