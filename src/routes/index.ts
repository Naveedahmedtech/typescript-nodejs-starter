import { router } from "@/config/express.config";

// ** routes
import auth from "./auth";

router.use("/auth", auth);

export default router;
