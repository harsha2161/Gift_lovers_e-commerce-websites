import express from "express"
import { BlockUser, createUser, DeleteUSer, loginUser, loginWithGoogle, sentOTP, veiwUsers } from "../Controllers/userController.js";

const userRouters = express.Router();

userRouters.post("/signup", createUser);
userRouters.post("/signin", loginUser);
userRouters.post("/blockusers/:email",BlockUser);
userRouters.delete("/deleteuser/:email",DeleteUSer)
userRouters.post("/login/google",loginWithGoogle);
userRouters.get("/", veiwUsers);
userRouters.post("/sentOTP", sentOTP);

export default userRouters;
