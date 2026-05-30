import e from "express";
import { submitRating, getMyStoreRatings, getMyStoreAverageRating } from "../controllers/ratingController.js";
import { verifyToken } from "../middlwares/verifytokenmiddlware.js";
import { authorizeRoles } from "../middlwares/authorizationMiddleware.js";

const router = e.Router();

router.post("/api/ratings/:store_id",verifyToken,authorizeRoles("USER"),submitRating);
router.get("/api/store-owner/ratings",verifyToken,authorizeRoles("STORE_OWNER"),getMyStoreRatings);

router.get("/api/store-owner/average-rating",verifyToken,authorizeRoles("STORE_OWNER"),getMyStoreAverageRating
);
export default router;