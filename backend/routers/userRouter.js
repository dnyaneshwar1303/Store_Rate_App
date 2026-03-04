import { updatePassword } from "../controllers/userController.js";
import { verifyToken } from "../middlwares/verifytokenmiddlware.js";
import { authorizeRoles } from "../middlwares/authorizationMiddleware.js";

function userRouter(app){
    app.patch("/api/user/password",verifyToken,authorizeRoles("USER","STORE_OWNER"),updatePassword);

};

export default userRouter;