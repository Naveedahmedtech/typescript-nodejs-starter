import { router } from "@/config/express.config";
import { googleCallback, registerUser, registerWithGoogle } from "@/controller/auth";
import { registerSchema } from "@/lib/validation/auth";
import csrfProtection from "@/middlewares/csrfTokenHandler";
import { validateRequest } from "@/middlewares/validation";

router.post(
  "/register",
  csrfProtection,
  validateRequest(registerSchema),
  registerUser
);
router.get("/google", registerWithGoogle)
// router.post("/google/callback", googleCallback)

export default router;
