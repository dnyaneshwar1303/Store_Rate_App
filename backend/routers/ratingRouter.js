import { submitRating, getRatingByStore } from "../controllers/ratingController.js";
import { verifyToken } from "../middlwares/verifytokenmiddlware.js";
import { authorizeRoles } from "../middlwares/authorizationMiddleware.js";


function ratingRouter(app){
    app.post("/api/ratings/:store_id",verifyToken,authorizeRoles("USER"),submitRating);
    app.get("/api/ratings/store/:id",verifyToken,authorizeRoles("STORE_OWNER"),getRatingByStore);

};

export default ratingRouter;