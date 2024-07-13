import { router } from "@/config/express.config";
import { registerUser } from "@/controller/auth";

router.get("/register", registerUser);

export default router;
