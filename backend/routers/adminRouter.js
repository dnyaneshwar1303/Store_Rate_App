import e from "express";
import { dashboardstats, createUser, getUsers, StoresDetails, getUserDetails, filterUsers, filterStores } from "../controllers/adminController.js";
import { verifyToken } from "../middlwares/verifytokenmiddlware.js";
import { authorizeRoles } from "../middlwares/authorizationMiddleware.js";

const router=e.Router();

router.get("/api/admin/dashboard",verifyToken,authorizeRoles("ADMIN"),dashboardstats);
router.post("/api/admin/users",verifyToken,authorizeRoles("ADMIN"),createUser);
router.get("/api/admin/users",verifyToken,authorizeRoles("ADMIN"),getUsers);
router.get("/api/admin/stores",verifyToken,authorizeRoles("ADMIN"),StoresDetails);
router.get("/api/admin/users/:id",verifyToken,authorizeRoles("ADMIN"),getUserDetails);
router.get("/api/admin/users/filter",verifyToken,authorizeRoles("ADMIN"),filterUsers);
router.get("/api/admin/stores/filter",verifyToken,authorizeRoles("ADMIN"),filterStores);


export default router;
