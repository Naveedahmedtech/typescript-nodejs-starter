import { router } from "@/config/express.config";
import { registerUser } from "@/controller/auth";

router.post("/register", registerUser);

export default router;
