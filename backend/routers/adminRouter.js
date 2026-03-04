import { dashboardstats, createUser, getUsers, StoresDetails } from "../controllers/adminController.js";
import { verifyToken } from "../middlwares/verifytokenmiddlware.js";
import { authorizeRoles } from "../middlwares/authorizationMiddleware.js";

function adminRouter(app){
    app.get("/api/admin/dashboard",verifyToken,authorizeRoles("ADMIN"),dashboardstats);
    app.post("/api/admin/users",verifyToken,authorizeRoles("ADMIN"),createUser);
    app.get("/api/admin/users",verifyToken,authorizeRoles("ADMIN"),getUsers);
    app.get("/api/admin/stores",verifyToken,authorizeRoles("ADMIN"),StoresDetails);
};

export default adminRouter;
