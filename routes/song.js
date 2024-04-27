import { getSongs } from "../controllers/song-crud.js";
import router from "./server.js";

router.get("/v1/song", getSongs);

export default router;
