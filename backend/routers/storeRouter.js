import e from "express";
import { createStore, getstores, searchStore } from "../controllers/storeController.js";
import { verifyToken } from "../middlwares/verifytokenmiddlware.js";
import { authorizeRoles } from "../middlwares/authorizationMiddleware.js";

const router=e.Router();

router.post("/api/store/create",verifyToken,authorizeRoles("ADMIN"),createStore);
router.get("/api/stores",verifyToken,authorizeRoles("ADMIN","USER"),getstores);
router.get("/api/store/search",verifyToken,authorizeRoles("USER"),searchStore);



export default router;