import { Router } from "express";
import { register, login, getUser, generateOtp, verifyOtp, checkResetSession, updateUser, resetPassword } from "../controllers/userControllers.js";
import { registerMail } from "../controllers/mailer.js";
import auth from "../middleware/auth.js";
import { verifyUser } from "../middleware/verifyUser.js";
import { localVariables } from "../middleware/localVariables.js";

const userRouter = Router();

//POST routes
userRouter.post("/register",register);
userRouter.post("/registerMail",registerMail);
userRouter.post("/authenticate",verifyUser,(req,res)=>res.end());
userRouter.post("/login",verifyUser,login);

//GET routes
userRouter.get("/getUser/:username",getUser);
userRouter.get("/generateOTP",verifyUser,localVariables,generateOtp); //Add username as url query like this: http://localhost:8080/api/user/generateOTP?username=AbanDubey
userRouter.get("/verifyOTP",verifyUser, verifyOtp);
userRouter.get("/checkResetSession",checkResetSession);

//PUT routes
userRouter.put("/updateUser",auth,updateUser);
userRouter.put("/resetPassword",verifyUser,resetPassword);

export default userRouter;