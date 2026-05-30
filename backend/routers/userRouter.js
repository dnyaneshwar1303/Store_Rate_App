import e from "express";
import { updatePassword } from "../controllers/userController.js";
import { verifyToken } from "../middlwares/verifytokenmiddlware.js";
import { authorizeRoles } from "../middlwares/authorizationMiddleware.js";

const router = e.Router();

router.patch("/api/user/password",verifyToken,authorizeRoles("ADMIN","USER","STORE_OWNER"),updatePassword);

export default router;