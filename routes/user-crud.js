import { getCurrentUser, updateCurrentUser } from "../controllers/user-crud.js";
import router from "./server.js";

router.get("/v1/user/me", getCurrentUser);
router.put("/v1/user/me", updateCurrentUser);

export default router;
