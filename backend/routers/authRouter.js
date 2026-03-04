import { register, login } from "../controllers/authController.js";



function authRouter(app){
    app.post("/api/auth/signup",register);
    app.post("/api/auth/login",login);
};

export default authRouter;