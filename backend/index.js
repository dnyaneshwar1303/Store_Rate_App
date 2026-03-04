import "./config/env.js";
import express from "express";
import { db } from "./models/userModel.js";
import cors from "cors";
import authRouter from "./routers/authRouter.js";
import adminRouter from "./routers/adminRouter.js";
import userRouter from "./routers/userRouter.js";
import storeRouter from "./routers/storeRouter.js";
import ratingRouter from "./routers/ratingRouter.js";

const app=express();
app.use(express.json());
app.use(cors());
authRouter(app);
adminRouter(app);
userRouter(app);
storeRouter(app);
ratingRouter(app);

app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
});