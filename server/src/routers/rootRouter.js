import express from "express";
import {
  postSignUp,
  postSignIn,
  postSignOut,
} from "../controllers/userController.js";
import { verifyToken } from "../middlewares.js";

const userRouter = express.Router();

userRouter.post("/signup", postSignUp);
userRouter.post("/signin", postSignIn);
userRouter.post("/signout", verifyToken, postSignOut);

export default userRouter;
