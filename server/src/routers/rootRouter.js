import express from "express";
import { postJoin, postLogin } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/signup", postJoin);
userRouter.post("/signin", postLogin);

export default userRouter;
