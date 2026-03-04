import { createStore, getstores, searchStoreByName, StoresDetailsById } from "../controllers/storeController.js";
import { verifyToken } from "../middlwares/verifytokenmiddlware.js";
import { authorizeRoles } from "../middlwares/authorizationMiddleware.js";

function storeRouter(app){
    app.post("/api/store/create",verifyToken,authorizeRoles("STORE_OWNER"),createStore);
    app.get("/api/stores",verifyToken,authorizeRoles("ADMIN","USER"),getstores);
    app.get("/api/store/details/:id",verifyToken,authorizeRoles("ADMIN","USER"),StoresDetailsById);
    app.get("/api/store/search",verifyToken,authorizeRoles("USER"),searchStoreByName);
};

export default storeRouter;